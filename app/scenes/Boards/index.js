import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { Grid } from 'material-ui';

import Board from './components/Board';
import BoardCreate from './components/BoardCreate';

import { fetchBoards, addBoard } from '../../actions';

class Boards extends Component {
  componentWillMount() {
    this.props.fetchBoards();
  }

  renderBoards = () => {
    const { classes } = this.props;
    const { boards: { byId, allIds } } = this.props;

    return allIds.map((id) => {
      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
          <Board board={byId[id]} />
        </Grid>
      );
    });
  }

  renderNewBoard = () => {
    const { classes } = this.props;
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} className={classes.gridTile}>
        <BoardCreate onCreate={this.onCreate} />
      </Grid>
    );
  }

  onCreate = (board) => {
    this.props.addBoard(board);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.boards}>
        <Grid container className={classes.gridList} spacing={16}>
          {this.renderBoards()}
          {this.renderNewBoard()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ boards }) => {
  return {
    boards
  };
};

const styles = theme => ({
  boards: {
    padding: '25px 5%'
  },
  gridList: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

export default compose(withStyles(styles), connect(mapStateToProps, { fetchBoards, addBoard }))(Boards);
