// @flow

import * as React from 'react';
import { Container } from 'reactstrap';
import EnergyTable from './EnergyTable';
import fetchContracts from '../helpers/fetchContracts';
import Voting from '../helpers/Voting';
import reactLogo from '../reactLogo.svg';
import ethereumLogo from '../ethereumLogo.svg';
import './App.css';

type Props = { network: string };

type State = {
  votePending: boolean,
  votes: any,
  poll: any,
};

class App extends React.Component<Props, State> {
  constructor(props: { network: string }) {
    super(props);
    this.state = {
      votePending: false,
      votes: null,
      poll: null,
    };
  }

  async componentDidMount(): any {
    const { contracts } = await fetchContracts(this.props.network, ['Voting']);
    const poll = new Voting(contracts.Voting);
    await poll.initCandidateList();
    const votes = await poll.fetchCandidateVotes();
    this.setState({
      votes,
      poll,
    });
  }

  voteHandler = (name: string) => async () => {
    this.setState({ votePending: true });
    const votes = await this.state.poll.voteForCandidate(name);
    this.setState({ votes, votePending: false });
  };

  render() {
    return (
      <Container>
        <h1>Solar Energy Trading</h1>
        {this.state.votes ? (
          <EnergyTable
            candidateList={this.state.poll.candidateList}
            votes={this.state.votes}
            voteHandler={this.voteHandler}
            votePending={this.state.votePending}
          />
        ) : null}
      </Container>
    );
  }
}

export default App;
