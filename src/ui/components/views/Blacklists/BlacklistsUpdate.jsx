import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import * as actions from "@domain/redux/blacklists/blacklists.actions";
import { getItem, updateItem } from "@domain/redux/_helpers/thunkService";
import { Label, Inputfield, Button, ErrorMessage } from "../../atoms";
import {
  textFieldSchema,
} from "../validations/schema";
import { AppLoader } from "../../molecules";
import constants from "./blacklists.constants";

const BlacklistsUpdate = ({ id, ...rest }) => {
  const { parameters, parameter } = constants;
  const callBackUrl = `/dashboard/${parameters}`;
  
  const { props } = rest;
  const { history } = props;
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();
  const { entity, entitytype } = errors;

  React.useEffect(()=>{
    dispatch(getItem(actions, `/${parameters}/${id}`));
  }, [dispatch, id, parameters]);

  const { blacklist, loading } = useSelector((state) => state.blacklists);

  const onSubmit = (data) => {
    dispatch(updateItem(actions, `${parameters}/${id}`, data, callBackUrl, history));
  };

  return (
    <div className="container-fluid">
      <h4 className="c-grey-900 mT-10 mB-30">{parameters.toUpperCase()}</h4>
      <div className="row">
        <div className="col-md-2" />
        <div className="col-md-8">
          <div className="bgc-white bd bdrs-3 p-20 mB-20">
            <h4 className="c-grey-900 mB-20">{`Edit ${parameter}`}</h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="needs-validation"
              noValidate
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Label labelClassName="text-normal text-dark">ID</Label>
                  <Inputfield
                    inputType="text"
                    inputClassName="form-control"
                    defaultValue={id}
                    inputName="id"
                    inputRef={register}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <Label labelClassName="text-normal text-dark">
                    Entity Type
                  </Label>
                  <Inputfield
                    inputType="text"
                    inputClassName={classnames("form-control", {
                      "is-invalid": entitytype,
                    })}
                    defaultValue={blacklist.entitytype}
                    inputName="entitytype"
                    inputRef={register(textFieldSchema)}
                  />
                  <ErrorMessage message={entitytype?.message} />
                </div>
                <div className="form-group col-md-6">
                  <Label labelClassName="text-normal text-dark">
                    Entity/Name
                  </Label>
                  <Inputfield
                    inputType="text"
                    inputClassName={classnames("form-control", {
                      "is-invalid": entity,
                    })}
                    defaultValue={blacklist.entity}
                    inputName="entity"
                    inputRef={register(textFieldSchema)}
                  />
                  <ErrorMessage message={entity?.message} />
                </div>
              </div>

              {loading ? (
                <center>
                  <AppLoader loaderWidth="15%" loaderClassName="app-loader" />
                </center>
              ) : (
                <div className="form-group d-flex flex-row-reverse">
                  <div className="peers ai-c jc-sb fxw-nw">
                    <div className="peer">
                      <Button
                        buttonType="submit"
                        buttonClassName="btn btn-primary mr-2"
                      >
                        Save
                      </Button>
                      <a
                        className="btn btn-outline-danger"
                        href={`/dashboard/${parameters}`}
                        role="button"
                      >
                        Cancel
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    </div>
  );
};

BlacklistsUpdate.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  props: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

BlacklistsUpdate.defaultProps = {
  history: {},
  props: {},
};

export default BlacklistsUpdate;
