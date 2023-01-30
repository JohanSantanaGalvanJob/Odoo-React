import React, { useState, useEffect } from "react";
import CompanyDataService from "../services/CompanyService";
import { Link ,useNavigate} from "react-router-dom";

const CompanyList = () => {
  const [Companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchBrand, setSearchBrand] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    retrieveCompanies();
  }, []);

  const onChangeSearchBrand = e => {
    const searchBrand = e.target.value;
    setSearchBrand(searchBrand);
  };

  const retrieveCompanies = () => {
    CompanyDataService.getAll()
      .then(response => {
        setCompanies(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCompanies();
    setCurrentCompany(null);
    setCurrentIndex(-1);
  };

  const setActiveCompany = (Company, index) => {
    setCurrentCompany(Company);
    setCurrentIndex(index);
  };

  const removeAllCompanies = () => {
    CompanyDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCompany = () => {
    CompanyDataService.remove(currentCompany.id)
      .then(response => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {

    if (searchBrand === '') {
      refreshList();
      return;
    }

    CompanyDataService.findByName(searchBrand)
      .then(response => {
        setCompanies(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchBrand}
            onChange={onChangeSearchBrand}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Companies List</h4>

        <ul className="list-group">
          {Companies &&
            Companies.map((Company, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCompany(Company, index)}
                key={index}
              >
                {Company.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCompanies}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCompany ? (
          <div>
            <h4>Company</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCompany.id}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCompany.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCompany.description}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentCompany.email}
            </div>

            <div>
              <label>
                <strong>Address:</strong>
              </label>{" "}
              {currentCompany.address}
            </div>

            <div>
              <label>
                <strong>Phone:</strong>
              </label>{" "}
              {currentCompany.phone}
            </div>

            <div>
              <label>
                <strong>Income:</strong>
              </label>{" "}
              {currentCompany.income}
            </div>

            <div>
              <label>
                <strong>Bill:</strong>
              </label>{" "}
              {currentCompany.bill}
            </div>


            <Link
              to={"/app/Company/" + currentCompany.id}
            >
               <button className="m-3 btn btn-sm btn-warning">Edit</button>
            </Link>

            <button className="m-3 btn btn-sm btn-danger" onClick={deleteCompany}>
            Delete
          </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Company...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
