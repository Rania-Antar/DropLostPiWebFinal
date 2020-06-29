import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// core components
import Button from "../../components/CustomButtons/Button.jsx";

import defaultImage from "../../../src/static/img/image_placeholder.jpg";
import defaultAvatar from "../../../src/static/img/placeholder.jpg";
import Axios from "axios";
import Dropzone from "react-dropzone";
import { FaBeer } from "react-icons/fa";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import { Carousel } from "antd";

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    // this.onDelete = this.onDelete.bind(this);

    this.state = {
      Images: [],
      file: null,
      image: "",
    };
  }
  onDrop = (files) => {
    let formData = new FormData();
    console.log("bbbbb");
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    //save the Image we chose inside the Node Server
    Axios.post(
      "https://localhost:8080/objects/uploadImage",
      formData,
      config
    ).then((response) => {
      console.log("&&&&&");

      if (response.data.success) {
        this.setState({
          Images: [...this.state.Images, response.data.image],
        });
        // this.props.refreshFunction([...this.state.Images, response.data.image])
        this.props.refreshFunction((this.Images = this.state.Images));

        console.log([this.state.Images]);
      } else {
        alert("Failed to save the Image in Server");
      }
    });
  };
  onDelete = (image) => {
    console.log("deleeete");

    const currentIndex = this.state.Images.indexOf(image);

    let newImages = [...this.state.Images];
    newImages.splice(currentIndex, 1);
    this.setState({
      Images: newImages,
    });
    // setImages(newImages)
    this.props.refreshFunction(newImages);
  };
  render() {
    const { classes, ...rest } = this.props;

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CardHeader image plain>
          <Dropzone onDrop={this.onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "260px",
                  height: "170px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <PlaylistAddIcon style={{ color: "blue", fontSize: "3rem" }} />
                &nbsp;&nbsp;
                <input {...getInputProps()} />
                <p
                  style={{
                    color: "blue ",
                    fontFamily: "Georgia",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  Drag 'n' drop some files here, or click to select files
                </p>
              </div>
            )}
          </Dropzone>

          <div
            style={{
              opacity: "1",
            }}
          />
        </CardHeader>
        <div
          class="thumbnail"
          style={{
            display: "flex",
            width: "260px",
            height: "170px",
            overflow: "auto",
            border: "0px solid lightgray ",
            color: "transparent",
          }}
        >
          {this.state.Images.map((image, index) => (
            <div onClick={() => this.onDelete(image)}>
              <img
                style={{ minWidth: "260px", width: "260px", height: "170px" }}
                src={`https://localhost:8080/${image}`}
                alt={`productImg-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

/*UploadImage.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object,
}*/

export default UploadImage;
