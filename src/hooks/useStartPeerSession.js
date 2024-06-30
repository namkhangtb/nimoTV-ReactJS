import { useEffect, useMemo, useState } from 'react';
import { createPeerConnectionContext } from '../utils/PeerConnectionSession';

export const useStartPeerSession = (room, userMediaStream) => {
  const peerVideoConnection = useMemo(() => createPeerConnectionContext(), []);

  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    if (userMediaStream) {
      peerVideoConnection.joinRoom(room, false);
      peerVideoConnection.onAddUser(user => {
        setConnectedUsers(users => [...users, user]);
        peerVideoConnection.addPeerConnection(
          `${user.id}`,
          userMediaStream,
          _stream => {
            document.getElementById(user.id).srcObject = _stream;
          },
        );
        peerVideoConnection.callUser(user.id);
      });

      peerVideoConnection.onRemoveUser(socketId => {
        setConnectedUsers(users => users.filter(user => user.id !== socketId));
        peerVideoConnection.removePeerConnection(socketId);
      });

      peerVideoConnection.onUpdateUserList(async users => {
        setConnectedUsers(users);
        for (const user of users) {
          peerVideoConnection.addPeerConnection(
            `${user.id}`,
            userMediaStream,
            _stream => {
              document.getElementById(user.id).srcObject = _stream;
            },
          );
        }
      });

      peerVideoConnection.onAnswerMade(socket =>
        peerVideoConnection.callUser(socket),
      );
    }

    return () => {
      if (userMediaStream) {
        setTimeout(() => {
          peerVideoConnection.clearConnections();
          userMediaStream?.getTracks()?.forEach(track => track.stop());
        }, 10000);
      }
    };
  }, [peerVideoConnection, room, userMediaStream]);

  return {
    connectedUsers,
    peerVideoConnection,
  };
};
