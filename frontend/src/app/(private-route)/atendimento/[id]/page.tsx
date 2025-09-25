'use client'

import { useParams } from "next/navigation"

export default function TicketDetail() {
    const params = useParams()

    return (
        <h1>Ticket -  {params.id}</h1>
    )
}