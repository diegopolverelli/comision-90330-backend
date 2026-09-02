import { EventDAO } from "../dao/EventDAO.js";
import { UsersDAO } from "../dao/UsersDAO.js";
import { EventService } from "../services/EventSercice.js";
import { EventController } from "./eventsController.js";

const eventDAO=new EventDAO()
const usersDAO=new UsersDAO()
const eventService=new EventService(eventDAO, usersDAO)
export const eventsController=new EventController(eventService)