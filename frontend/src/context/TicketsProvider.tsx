import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState } from "react";
import { ITicket } from "../interfaces/interface";
import { getTickets, postTicket, deleteTicket, updateTicketStatus, updateTicketAssignedTo } from "../services/ticketApi";

interface TicketsProviderProps {
    children: React.ReactNode
}

export const TicketsContext = createContext({});

const TicketProvider = ({ children }: TicketsProviderProps) => {
    const { getAccessTokenSilently } = useAuth0();
    const [tickets, setTickets] = useState<ITicket[]>([]);

    const fetchTickets = async (teamId: number) => {
        const accessToken = await getAccessTokenSilently();
        setTickets(await getTickets(teamId, accessToken));
    }

    // const updateTicketAssignee = async (ticketId: number, userId: number) => {
    //     const accessToken = await getAccessTokenSilently();
    //     await updateTicketAssignedTo(ticketId, userId, accessToken)
    //     setTickets(await getTickets(accessToken));


    const postingTicket = async (ticket: Partial<ITicket>) => {
        const accessToken = await getAccessTokenSilently();
        const response = await postTicket(ticket, accessToken);
        setTickets(prevState => [response, ...prevState]);
    }

    const deletingTicket = async (ticket: ITicket) => {
        const accessToken = await getAccessTokenSilently();
        const response = await deleteTicket(ticket.ticketId, accessToken);
        setTickets(prevState => prevState.filter(filteredTicket => filteredTicket.ticketId != ticket.ticketId));
    }

    return (
        <TicketsContext.Provider value={{ tickets, setTickets, fetchTickets, deletingTicket, postingTicket }}>
            {children}
        </TicketsContext.Provider>
    );
}

export default TicketProvider;
