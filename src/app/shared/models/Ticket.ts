export interface Ticket {
    dateCreated:             Date;
    lastUpdated:             string;
    closedAt:                string;
    ticketType:              string;
    assignee:                string;
    escalationLevel:         string;
    ticketStatus:            string;
    estimatedResolutionTime: Date;
    actualResolutionTime:    number;
    dailyReportSent:         boolean;
    name:                    string;
    phone:                   string;
    email:                   string;
    businessUnit:            string;
    description:             string;
}