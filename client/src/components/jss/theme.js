import {
  createMuiTheme
} from '@material-ui/core/styles';

export const theme = createMuiTheme({
 
    overrides: {
      MuiInput: {
        underline: {
          '&:before': { //underline color when textfield is inactive
            borderColor: 'red',
          },
          '&:hover:not($disabled):before': { //underline color when hovered 
            borderColor: 'green',
          },
        }
      }
  },
  palette: {
    input: {
      bottomLine: '#ffffff'
    },
    primary: {
      light: '#ffffff',
      main: '#F20F60',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#fff',
    },
  },
});