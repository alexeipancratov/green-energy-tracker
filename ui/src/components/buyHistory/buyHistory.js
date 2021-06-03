import React from "react";

export default function BuyHistory(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Event Type</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        {props.events.map((e) => (
          <tr key={e.id}>
            <td>{e.event}</td>
            <td>{e.raw.topics[1]}</td>
            <td>{e.raw.topics[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
