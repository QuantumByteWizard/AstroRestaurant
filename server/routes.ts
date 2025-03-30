import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { bookingFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix with /api
  const apiRouter = express.Router();
  
  // Endpoint to handle reservation creation
  apiRouter.post('/reservations', async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validatedData = bookingFormSchema.parse(req.body);
      
      // Store the reservation
      const newReservation = await storage.createReservation(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Reservation created successfully",
        reservation: newReservation
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          message: "Validation failed", 
          errors: validationError.message 
        });
      } else {
        res.status(500).json({ 
          message: "Server error occurred while creating reservation"
        });
      }
    }
  });

  // Endpoint to get all reservations (typically would be admin-only)
  apiRouter.get('/reservations', async (req: Request, res: Response) => {
    try {
      const reservations = await storage.getReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ 
        message: "Server error occurred while fetching reservations"
      });
    }
  });

  app.use('/api', apiRouter);

  const httpServer = createServer(app);

  return httpServer;
}
