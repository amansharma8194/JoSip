export function getnameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }
  return splitName[0][0];
}
export function transformToArray(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}
export async function getUserUpdates(userId, keyToUpdate, value, database) {
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;
  const getMsgs = database
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');
  const getRooms = database
    .ref('rooms')
    .orderByChild('lastmessage/author/uid')
    .equalTo(userId)
    .once('value');
  const [msgsSnap, roomsSnap] = await Promise.all([getMsgs, getRooms]);
  msgsSnap.forEach(msg => {
    updates[`/messages/${msg.key}/author/${keyToUpdate}`] = value;
  });
  roomsSnap.forEach(room => {
    updates[`/rooms/${room.key}/lastmessage/author/${keyToUpdate}`] = value;
  });
  return updates;
}
