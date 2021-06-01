export interface RemoteMessage<ExtraData = any> {
    title?: string;
    subtitle?: string;
    body?: string;
    id?: string;
    badge?: number;
    notification?: any;
    data?: ExtraData;
    actionId: "tap" | "dismiss" | undefined | null;
    inputValue?: string;
}
