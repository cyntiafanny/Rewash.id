import {Component, OnInit} from '@angular/core';
import {Chat} from "../services/chat/chat.model";
import {ActivatedRoute} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  outletName: string;
  loadedChat: Chat[] = [];
  uid: string;
  orderId: string;
  message: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,
    public auth: AngularFireAuth,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('idOrder')) {
        return;
      }

      this.orderId = paramMap.get('idOrder');

      this.db.object('/chat/' + this.orderId).valueChanges().subscribe(data => {
        this.uid = data.user;
        this.outletName = data.outlet_name;
        Object.keys(data.chat).forEach(chatKey => {
          this.loadedChat.push({
            message: data.chat[chatKey].message,
            time: data.chat[chatKey].time,
            sender: data.chat[chatKey].sender
          })
        })
      })
    })
  }

  handleSendMessage() {
    if (this.message !== "") {
      this.db.list('/chat/' + this.orderId + '/chat').push({
        sender: this.uid,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        message: this.message
      })
      this.message = "";
    }
  }

}
