import React from 'react';
import { Avatar, Image } from 'antd';

export default function ChatBoxReceiver({ avatar, user, message }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            style={{
              objectFit: 'cover', // Corrected typo here
              width: 45,
              height: 45,
              borderRadius: '50%', // Use '50%' instead of '100%' for a perfect circle
            }}
            preview={false}
          />
        }
      />
      <p style={{ padding: 10, backgroundColor: 'red', borderRadius: 10, maxWidth: '60%' }}>
        <strong style={{ fontSize: 13 }}>{user}</strong>
        <br />
        {message}
        
      </p>
    </div>
  );
}


export function ChatBoxSender({ avatar, user, message }) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
        <Avatar
          size={50}
          src={
            <Image
              src={avatar}
              style={{
                objectFit: 'cover', // Corrected typo here
                width: 45,
                height: 45,
                borderRadius: '50%', // Use '50%' instead of '100%' for a perfect circle
              }}
              preview={false}
            />
          }
        />
        <p style={{ padding: 10, backgroundColor: 'white', borderRadius: 10, maxWidth: '60%' }}>
          <strong style={{ fontSize: 13 }}>{user}</strong>
          <br />
          {message}
        </p>
      </div>
    );
  }