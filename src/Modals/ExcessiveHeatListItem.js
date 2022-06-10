import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ExcessiveHeatListItem({ data }) {
  const { Event, Start, End_, Affected, Summary, Link, Updated } = data;
  const startDate = new Date(Start);
  const endDate = new Date(End_);
  const updatedDate = new Date(Updated);
  return (
    <ListGroup.Item>
      <div style={{ fontSize: '12.5px' }}>
        <p style={{ fontSize: '14px' }}>
          {Event} is effective from{' '}
          <b>
            {startDate.toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </b>{' '}
          through{' '}
          <b>
            {endDate.toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </b>
        </p>
        <b>Areas Affected:</b> {Affected}
        <br />
        <br />
        <b>Summary:</b> {Summary}
        <a
          style={{ marginLeft: '10px' }}
          href={Link}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </a>
        <br />
        <br />
        <b>Last Updated:</b>{' '}
        {updatedDate.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </div>
    </ListGroup.Item>
  );
}
