/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProcessService } from './Process.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-process',
  templateUrl: './Process.component.html',
  styleUrls: ['./Process.component.css'],
  providers: [ProcessService]
})
export class ProcessComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  processId = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);
  isAccomplishSender = new FormControl('', Validators.required);
  c = new FormControl('', Validators.required);
  sender = new FormControl('', Validators.required);
  receiver = new FormControl('', Validators.required);
  order = new FormControl('', Validators.required);

  constructor(public serviceProcess: ProcessService, fb: FormBuilder) {
    this.myForm = fb.group({
      processId: this.processId,
      status: this.status,
      isAccomplishSender: this.isAccomplishSender,
      c: this.c,
      sender: this.sender,
      receiver: this.receiver,
      order: this.order
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceProcess.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.sysu.wf.Process',
      'processId': this.processId.value,
      'status': this.status.value,
      'isAccomplishSender': this.isAccomplishSender.value,
      'c': this.c.value,
      'sender': this.sender.value,
      'receiver': this.receiver.value,
      'order': this.order.value
    };

    this.myForm.setValue({
      'processId': null,
      'status': null,
      'isAccomplishSender': null,
      'c': null,
      'sender': null,
      'receiver': null,
      'order': null
    });

    return this.serviceProcess.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'processId': null,
        'status': null,
        'isAccomplishSender': null,
        'c': null,
        'sender': null,
        'receiver': null,
        'order': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.sysu.wf.Process',
      'status': this.status.value,
      'isAccomplishSender': this.isAccomplishSender.value,
      'c': this.c.value,
      'sender': this.sender.value,
      'receiver': this.receiver.value,
      'order': this.order.value
    };

    return this.serviceProcess.updateAsset(form.get('processId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceProcess.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceProcess.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'processId': null,
        'status': null,
        'isAccomplishSender': null,
        'c': null,
        'sender': null,
        'receiver': null,
        'order': null
      };

      if (result.processId) {
        formObject.processId = result.processId;
      } else {
        formObject.processId = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      if (result.isAccomplishSender) {
        formObject.isAccomplishSender = result.isAccomplishSender;
      } else {
        formObject.isAccomplishSender = null;
      }

      if (result.c) {
        formObject.c = result.c;
      } else {
        formObject.c = null;
      }

      if (result.sender) {
        formObject.sender = result.sender;
      } else {
        formObject.sender = null;
      }

      if (result.receiver) {
        formObject.receiver = result.receiver;
      } else {
        formObject.receiver = null;
      }

      if (result.order) {
        formObject.order = result.order;
      } else {
        formObject.order = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'processId': null,
      'status': null,
      'isAccomplishSender': null,
      'c': null,
      'sender': null,
      'receiver': null,
      'order': null
      });
  }

}
