// @flow

import * as React from 'react';
import { Table, Button, Progress } from 'reactstrap';

const CandidateRow = ({ name, votes, votePending, onClick }) => (
  <tr>
    <td>
      <Button color="primary" disabled={votePending} onClick={onClick}>
        {name}
      </Button>
    </td>
    <td>{votes}</td>
  </tr>
);

type energyTableProps = {
  candidateList: Array<string>,
  votes: { [name: string]: number },
  voteHandler: (name: string) => () => any,
  votePending: boolean,
};

const EnergyTable = (props: votingTableProps) => (
  <Table bordered>
    <thead>
      <tr>
        <th>Send Energy To:</th>
        <th>kWh</th>
      </tr>
      <tr>
        <th colSpan="2" style={{ padding: 0 }}>
          {props.votePending ? (
            <Progress animated value="100" color="warning">
              Energy Transactions Pending
            </Progress>
          ) : (
            <Progress value="100" color="success">
              Energy Transactions Recorded
            </Progress>
          )}
        </th>
      </tr>
    </thead>
    <tbody>
      {props.candidateList.map(name => (
        <CandidateRow
          key={name}
          name={name}
          votes={props.votes[name]}
          votePending={props.votePending}
          onClick={props.voteHandler(name)}
        />
      ))}
    </tbody>
  </Table>
);

export default EnergyTable;
