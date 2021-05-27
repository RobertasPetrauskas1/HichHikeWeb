import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Logout(props) {
  const history = useHistory()
  const clickHandler = () => {
    localStorage.removeItem('TOKEN')
    history.push("/");
    props.setIsLoggedIn(false);
    props.setAlertVariant('success')
    props.setAlertHeading("Jūsų sesija baigta.")
    props.setShowAlert(true)
  };

  return (
    <Button variant="secondary" onClick={clickHandler}>
      Atsijungti
    </Button>
  );
}
