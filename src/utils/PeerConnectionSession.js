import { environment } from 'app/environments/environment';
import * as io from 'socket.io-client';

const { RTCPeerConnection, RTCSessionDescription } = window;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class PeerConnectionSession {
  _onConnected;
  _onDisconnected;
  _room;
  peerConnections = {};
  senders = [];
  listeners = {};

  constructor(socket) {
    this.socket = socket;
    this.onCallMade();
  }

  async addPeerConnection(id, stream, callback) {
    this.peerConnections[id] = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:hk-turn1.xirsys.com'],
        },
        {
          username:
            'ev0YPdQSbb68eIS54Ls4mRk5KDQRVa11Q11Qc8p8Aa7OZ4CA0Z-YpDzxgm3vICI4AAAAAGVXkWdsZW1pbmh0dTQ4OQ==',
          credential: '64258aee-8564-11ee-83b3-0242ac120004',
          urls: [
            'turn:hk-turn1.xirsys.com:80?transport=udp',
            'turn:hk-turn1.xirsys.com:3478?transport=udp',
            'turn:hk-turn1.xirsys.com:80?transport=tcp',
            'turn:hk-turn1.xirsys.com:3478?transport=tcp',
            'turns:hk-turn1.xirsys.com:443?transport=tcp',
            'turns:hk-turn1.xirsys.com:5349?transport=tcp',
          ],
        },
      ],
    });

    await stream.getTracks().forEach(track => {
      const sender = this.peerConnections[id].addTrack(track, stream);
      this.senders.push(sender);
    });

    this.listeners[id] = event => {
      const fn =
        this[
          '_on' +
            capitalizeFirstLetter(this.peerConnections[id].connectionState)
        ];
      fn && fn(event, id);
    };

    await this.peerConnections[id].addEventListener(
      'connectionstatechange',
      this.listeners[id],
    );

    this.peerConnections[id].ontrack = function ({ streams: [stream] }) {
      callback(stream);
    };
  }

  removePeerConnection(id) {
    this.peerConnections[id].removeEventListener(
      'connectionstatechange',
      this.listeners[id],
    );
    delete this.peerConnections[id];
    delete this.listeners[id];
  }

  isAlreadyCalling = false;

  async callUser(to) {
    if (this.peerConnections[to].iceConnectionState === 'new') {
      const offer = await this.peerConnections[to].createOffer();
      await this.peerConnections[to].setLocalDescription(
        new RTCSessionDescription(offer),
      );

      this.socket.emit('call-user', { offer, to });
    }
  }

  onConnected(callback) {
    this._onConnected = callback;
  }

  onDisconnected(callback) {
    this._onDisconnected = callback;
  }

  joinRoom(streamUrl, isStreamer) {
    this._room = streamUrl;
    this.socket.emit('join-stream', { streamUrl, isStreamer });
  }

  onCallMade() {
    this.socket.on('call-made', async data => {
      await this.peerConnections[data.socket].setRemoteDescription(
        new RTCSessionDescription(data.offer),
      );
      const answer = await this.peerConnections[data.socket].createAnswer();
      await this.peerConnections[data.socket].setLocalDescription(
        new RTCSessionDescription(answer),
      );

      this.socket.emit('make-answer', {
        answer,
        to: data.socket,
      });
    });
  }

  onAddUser(callback) {
    this.socket.on(`${this._room}-add-user`, async data => {
      callback(data);
    });
  }

  onRemoveUser(callback) {
    this.socket.on(`${this._room}-remove-user`, ({ socketId }) => {
      callback(socketId);
    });
  }

  onUpdateUserList(callback) {
    this.socket.on(`${this._room}-update-user-list`, ({ users, current }) => {
      callback(users, current);
    });
  }

  onAnswerMade(callback) {
    this.socket.on('answer-made', async data => {
      await this.peerConnections[data.socket].setRemoteDescription(
        new RTCSessionDescription(data.answer),
      );
      callback(data.socket);
    });
  }

  clearConnections() {
    this.socket.close();
    this.senders = [];
    Object.keys(this.peerConnections).forEach(
      this.removePeerConnection.bind(this),
    );
  }

  async watcherJoined(to) {
    if (this.peerConnections[to].iceConnectionState === 'new') {
      const offer = await this.peerConnections[to].createOffer();
      await this.peerConnections[to].setLocalDescription(
        new RTCSessionDescription(offer),
      );

      this.socket.emit('call-user', { offer, to });
    }
  }

  onAddWatcher(callback) {
    this.socket.on(`joined-${this._room}`, async ({ id }) => {
      callback(id);
    });
  }

  async onGetMessage(callback) {
    await this.socket.on('on-message', async data => {
      callback(data);
    });
  }

  async sendMessage(data) {
    await this.socket.emit('new-message', data);
  }
}

export const createPeerConnectionContext = () => {
  const socket = io(`${environment.BASEURL_BACKEND}/chat`, {
    transports: ['websocket'],
  });

  return new PeerConnectionSession(socket);
};
