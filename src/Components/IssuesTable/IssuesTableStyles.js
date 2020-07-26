import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    paddingBottom: 50,
    marginBottom: 20,
    marginTop: 40,
    position: 'relative',
    overflowX: 'auto',
    overflowY: 'hidden',
  },
  tableWrapper: {
    minWidth: 720,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 0,
    flexWrap: 'nowrap',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  addButton: { position: 'absolute', bottom: 0, right: 0 },
}));

export default useStyles;
