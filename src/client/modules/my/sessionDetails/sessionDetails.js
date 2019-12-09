import { LightningElement, api, track } from 'lwc';
import { getSession } from 'data/sessionService';
export default class sessionDetails extends LightningElement {
    @track session;
    @api
    set sessionId(id) {
        this._sessionId = id;
        this.session = getSession(id);
    }
    get sessionId() {
        return this._sessionId;
    }
}
