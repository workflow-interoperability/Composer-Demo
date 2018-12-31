import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.sysu.wf{
   export enum Status {
      CREATED,
      PUBLISH,
      ACCEPTED,
      REJECTED,
      ACCOMPLISHED,
      FAILED,
   }
   export class Order {
      orderStatement: string;
      deadlineOfAccepting: Date;
      deadlineOfAccomplishing: Date;
      ProfessionOrParticipant: string;
   }
   export class Process extends Asset {
      processId: string;
      status: Status;
      isAccomplishSender: boolean;
      c: boolean;
      sender: string;
      receiver: string;
      order: Order;
   }
   export class Member extends Participant {
      memberId: string;
      profession: string;
   }
   export abstract class ChangeStatus extends Transaction {
      process: Process;
   }
   export class Publish extends Transaction {
      order: Order;
   }
   export class Accepted extends ChangeStatus {
   }
   export class Accomplished extends ChangeStatus {
   }
// }
