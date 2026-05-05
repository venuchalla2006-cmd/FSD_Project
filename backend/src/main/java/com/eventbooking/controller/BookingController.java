package com.eventbooking.controller;

import com.eventbooking.model.Booking;
import com.eventbooking.model.Event;
import com.eventbooking.repository.BookingRepository;
import com.eventbooking.repository.EventRepository;
import com.eventbooking.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/book-ticket")
    public ResponseEntity<?> bookTicket(@Valid @RequestBody Booking booking, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        if (booking.getEvent() == null || booking.getEvent().getId() == null) {
            return ResponseEntity.badRequest().body("Event is required");
        }

        Optional<Event> eventOpt = eventRepository.findById(booking.getEvent().getId());
        if (eventOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Event not found");
        }

        Event event = eventOpt.get();
        
        if (booking.getTicketsBooked() <= 0) {
            return ResponseEntity.badRequest().body("Tickets booked must be greater than zero");
        }

        if (event.getAvailableTickets() < booking.getTicketsBooked()) {
            return ResponseEntity.badRequest().body("Not enough available tickets");
        }

        // Deduct tickets
        event.setAvailableTickets(event.getAvailableTickets() - booking.getTicketsBooked());
        eventRepository.save(event);

        // Calculate total amount
        double totalAmount = event.getPrice() * booking.getTicketsBooked();
        booking.setTotalAmount(totalAmount);
        
        // Save booking
        Booking savedBooking = bookingRepository.save(booking);

        if (savedBooking.getEmail() != null && !savedBooking.getEmail().isEmpty()) {
            String emailHtml = "<div style=\"font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;\">" +
                    "<div style=\"background: linear-gradient(135deg, #10b981, #047857); padding: 20px; text-align: center;\">" +
                    "<h1 style=\"color: #ffffff; margin: 0; font-size: 24px;\">Booking Confirmed!</h1></div>" +
                    "<div style=\"padding: 30px; color: #333333;\"><p style=\"font-size: 16px;\">Hello <strong>" + savedBooking.getName() + "</strong>,</p>" +
                    "<p style=\"font-size: 16px;\">Your payment has been successfully processed and your booking is confirmed.</p>" +
                    "<div style=\"background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin: 25px 0;\">" +
                    "<h3 style=\"margin-top: 0; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;\">Receipt Details</h3>" +
                    "<p><strong>Event:</strong> " + event.getName() + "</p>" +
                    "<p><strong>Tickets Booked:</strong> " + savedBooking.getTicketsBooked() + "</p>" +
                    "<p style=\"font-size: 18px; color: #10b981; font-weight: bold; margin-top: 15px;\">Total Paid: $" + savedBooking.getTotalAmount() + "</p></div>" +
                    "<p style=\"font-size: 14px; color: #6b7280;\">Thank you for choosing AuraTix. We look forward to seeing you at the event!</p></div></div>";
            emailService.sendEmail(savedBooking.getEmail(), "Booking Confirmation & Receipt - AuraTix", emailHtml);
        }

        return ResponseEntity.ok(savedBooking);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @GetMapping("/bookings/user/{username}")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable String username) {
        return ResponseEntity.ok(bookingRepository.findByUsername(username));
    }
}
