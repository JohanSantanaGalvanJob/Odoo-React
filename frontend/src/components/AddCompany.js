import React, { useState } from "react";
import CompanyService from "../services/CompanyService";

const AddCompany = () => {
  const initialCompanyState = {
    id: null,
    name: "",
    description: "",
    email: "",
    phone: null,
    address: "",
    income: null,
    bill: null
  };
  const [Company, setCompany] = useState(initialCompanyState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...Company, [name]: value });
  };

  const saveCompany = () => {
    var data = {
      name: Company.name,
      description: Company.description,
      email: Company.email,
      phone: Company.phone,
      address: Company.address,
      income: Company.income,
      bill: Company.bill
    };

    CompanyService.create(data)
      .then(response => {
        setCompany({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          email:response.data.email,
          phone:response.data.phone,
          address:response.data.address,
          income:response.data.income,
          bill:response.data.bill
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCompany = () => {
    setCompany(initialCompanyState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCompany}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={Company.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={Company.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={Company.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              required
              value={Company.phone}
              onChange={handleInputChange}
              name="phone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={Company.address}
              onChange={handleInputChange}
              name="address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="income">Income</label>
            <input
              type="number"
              className="form-control"
              id="income"
              required
              value={Company.income}
              onChange={handleInputChange}
              name="income"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bill">Bill</label>
            <input
              type="number"
              className="form-control"
              id="bill"
              required
              value={Company.bill}
              onChange={handleInputChange}
              name="bill"
            />
          </div>

          <button onClick={saveCompany} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCompany;
