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
            String emailContent = "Hello " + savedBooking.getName() + ",\n\n" +
                    "Your payment has been successfully completed and your booking is confirmed!\n\n" +
                    "Event: " + event.getName() + "\n" +
                    "Tickets: " + savedBooking.getTicketsBooked() + "\n" +
                    "Total Paid: $" + savedBooking.getTotalAmount() + "\n\n" +
                    "Thank you for choosing AuraTix!";
            emailService.sendEmail(savedBooking.getEmail(), "Booking Confirmation & Payment Receipt - AuraTix", emailContent);
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
