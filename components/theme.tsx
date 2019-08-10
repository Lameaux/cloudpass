import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/deepPurple';

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: blue,
  },
});

export default theme;
