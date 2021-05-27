import { Link } from "react-router-dom";
import Trip from "./Trip";

export default function TripList(props) {
  if(props.trips.length === 0){
    return (
      <>
        <div className="mb-3 p-3 tripItem">
          Kelionių nėra
          </div>
      </>
    )
  }else{
    return props.trips.map((trip) => {
      return (
        <Link to={`/trip/${trip._id}`} style={{color: '#000'}} key={trip._id}>
          <div>
            <Trip trip={trip} />
          </div>
        </Link>
      );
    });
  }
}
