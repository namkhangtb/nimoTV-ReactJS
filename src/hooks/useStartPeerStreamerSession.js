import { useEffect, useMemo, useState } from 'react';
import { createPeerConnectionContext } from '../utils/PeerConnectionSession';

export const useStartPeerStreamerSession = (
  room,
  userMediaStream,
  isStartStream,
) => {
  console.log(isStartStream);
  const peerVideoConnection = useMemo(() => createPeerConnectionContext(), []);

  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    if (userMediaStream && isStartStream === true) {
      peerVideoConnection.joinRoom(room, true);
      peerVideoConnection.onAddUser(user => {
        setConnectedUsers(users => [...users, user]);
        peerVideoConnection.addPeerConnection(`${user.id}`, userMediaStream);
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

    // return () => {
    //   if (userMediaStream) {
    //     setTimeout(() => {
    //       peerVideoConnection.clearConnections();
    //       userMediaStream?.getTracks()?.forEach(track => track.stop());
    //     }, 400);
    //   }
    // };
  }, [peerVideoConnection, room, userMediaStream, isStartStream]);

  return {
    connectedUsers,
    peerVideoConnection,
  };
};
