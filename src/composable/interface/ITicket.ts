export interface ITicket{
    TicketId?               :   number
    Amount                  :   number
    Phone?                  :   string
    Name?                   :   string
    Note?                   :   string
    Motif?                  :   string
    CurrencyFId             :   number
    UserFId                 :   number
    TransferTypeFId         :   number
    TransferStatusFId       :   number
    Debut?                  :   string
    FinS?                   :   string
    DureeS?                 :   string        
    FinP ?                  :   string
    DureeP?                 :   string
    ClotureDateCreated?     :   string
    DateCreated?            :   string
}
export interface ITicketRequestClose{
    TicketId                : number,
    Motif                   : string,
    TransferStatusFId       : number,
    ClotureDateCreated      : string,
}
        
 