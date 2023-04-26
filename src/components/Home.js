//import Notes from "./Notes";
import { Link } from "react-router-dom";
const Home = props => {
    const { showAlert } = props;
    return (
        <div>
           <div className=" border border-dark container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom text-dark">
         Categories
        </h2>
        <div className="row g-4 py-5 row-cols-2 row-cols-lg-2">
          <div className="feature col mb-4">
            <h3 className="text-primary">FOOD</h3>
            <p>
              We ensure that your expenses are highly secured in our database and
              you can safely access your account and expenses.
            </p>
            <Link to="/food" className="btn btn-warning">
              Food
            </Link>
          </div>
          <div className="feature col mb-4">
            <h3 className="text-primary">FUEL</h3>
            <p>
              We ensure that your expenses are highly secured in our database and
              you can safely access your account and expenses.
            </p>
            <Link to="/fuel" className="btn btn-warning">
              Fuel
            </Link>
          </div>
          <div className="feature col mb-4">
            <h3 className="text-primary">RENT</h3>
            <p>
              Your Expenses will be highly secured on the cloud and will be able to
              access them easily via your account login credentials.
            </p>
            <Link to="/rent" className="btn btn-warning">
              Rent
            </Link>
          </div>
          <div className="feature col mb-4">
            <h3 className="text-primary">OTHER</h3>
            <p>
              Create and Visualize your expenses without any charge. 
            </p>
            <Link to="/other" className="btn btn-warning icon-link">
              Other
            </Link>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Home;