interface PayeeItem {
    payeeIdType: string;
    payeeIdValue: string;
    amount: string;
    currency: string;
}
export interface SendMoneyRequest {
    payerName: string;
    payeeList: PayeeItem[];
}
declare const _default: {
    sendMoney: (sendMoneyRequest: SendMoneyRequest) => Promise<any[]>;
};
export default _default;
