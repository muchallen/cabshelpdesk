http://localhost:8080/whatsappbot/constants/ticket-statuse
[
    "OPEN",
    "IN PROGRESS",
    "ON HOLD",
    "RESOLVED",
    "DECLINED",
    "AWAITING INVESTIGATION"
  ]

  http://localhost:8080/whatsappbot/constants/escalation-levels

  [
    "NORMAL",
    "IMPORTANT",
    "URGENT",
    "CRITICAL"
  ]

  http://localhost:8080/whatsappbot/internal/alltickets

  [
    {
      "dateCreated": "2022-03-28T13:38:02.182+00:00",
      "lastUpdated": "2022-04-01T11:22:15.648+00:00",
      "closedAt": "2022-04-01T09:02:58.817+00:00",
      "ticketType": "QUERY",
      "assignee": "om477804",
      "escalationLevel": "CRITICAL",
      "ticketStatus": "OPEN",
      "estimatedResolutionTime": null,
      "actualResolutionTime": 20,
      "dailyReportSent": false,
      "name": "Tinashe",
      "phone": "0778045305",
      "email": "tinashezv@oldmutual.co.zw",
      "businessUnit": "CABS",
      "description": "Test, internet down"
    },
    {
      "dateCreated": "2022-03-29T08:22:32.917+00:00",
      "lastUpdated": "2022-04-01T11:23:02.692+00:00",
      "closedAt": "2022-04-01T09:03:22.124+00:00",
      "ticketType": "QUESTION",
      "assignee": "om477804",
      "escalationLevel": "CRITICAL",
      "ticketStatus": "OPEN",
      "estimatedResolutionTime": null,
      "actualResolutionTime": 20,
      "dailyReportSent": false,
      "name": "example name",
      "phone": "078374748",
      "email": "example@gmail.com",
      "businessUnit": "CABS",
      "description": "Demo Question "
    }
  ]

  /whatsappbot/internal/deleteticket

  {
    "id": "string"
  }

  
​/whatsappbot​/internal​/escalate
{
    "escalationLevel": "string",
    "id": "string"
  }

  /whatsappbot/internal/getticket

  {
    "id": "string"
  }

  /whatsappbot/internal/reassign

  {
    "assignee": "string",
    "id": "string"
  }

  /whatsappbot/internal/resolve
  {
    "id": "string",
    "ticketStatus": "string"
  }