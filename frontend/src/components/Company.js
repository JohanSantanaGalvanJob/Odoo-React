import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CompanyService from "../services/CompanyService";

const Company = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCompanyState = {
    id: null,
    name: "",
    description: "",
    email:"",
    phone:null,
    address:"",
    income:null,
    bill:null
  };
  const [currentCompany, setCurrentCompany] = useState(initialCompanyState);
  const [message, setMessage] = useState("");

  const getCompany = id => {
    CompanyService.get(id)
      .then(response => {
        setCurrentCompany(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCompany(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };

  const updateCompany = () => {
    CompanyService.update(currentCompany.id, currentCompany)
      .then(response => {
        setMessage("The Company was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  

  return (
    <div>
      {currentCompany ? (
        <div className="edit-form">
          <h4>Company</h4>
          <form>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCompany.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCompany.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentCompany.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={currentCompany.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={currentCompany.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="income">Income</label>
              <input
                type="text"
                className="form-control"
                id="income"
                name="income"
                value={currentCompany.income}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bill">Bill</label>
              <input
                type="text"
                className="form-control"
                id="bill"
                name="bill"
                value={currentCompany.bill}
                onChange={handleInputChange}
              />
            </div>

          </form>

         

          <button
            type="submit"
            className="m-3 btn btn-sm btn-success"
            onClick={updateCompany}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Company...</p>
        </div>
      )}
    </div>
  );
};

export default Company;
