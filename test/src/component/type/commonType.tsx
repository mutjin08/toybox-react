export type StateType = {
    userid:string;
    username:string;
    isLogon:boolean; 
}

export type LogonAction = 
    {type:"RESET", value:StateType}
    | {type:"LOGON", value:StateType}
    | {type:"LOGOUT", value:StateType};

export type PhotoType={
    "albumId": number;
    "id": number;
    "title": string;
    "url": string;
    "thumbnailUrl": string;
}