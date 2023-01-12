import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import url from "../../Config/URL";
import { toast } from "react-toastify";
import { PhotoCamera, Check } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Loading from "../../components/Loading";
function UpdateOffer(props) {
  const [id, setId] = useState(props.location.query.id);
  const [title, setTitle] = useState(props.location.query.title);
  const [description, setDescription] = useState(
    props.location.query.description
  );
  const [detailed_description, setDetailedDescription] = useState(
    props.location.query.detailed_description
  );
  const [image, setImage] = useState("");
  const [type, setType] = useState(props.location.query.type);

  const [imageURL, setImageURL] = useState(props.location.query.image);

  const [uploadingImage, setImageUploading] = useState(false);

  useEffect(() => {
    if (props.auth.msg !== "Login Successfully") {
      props.history.push("/");
    }
  }, [props.auth.msg]);

  const updateImage = () => {
    setImageUploading(true);
    const imageFile = new FormData();
    imageFile.append("image", image);

    fetch(`${url}/instructions/image/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: imageFile,
    }).then((res) => {
      res.json().then((newImageURL) => {
        console.log(newImageURL);
        setImageURL(newImageURL);
        setImage("");
        toast.success("Image Updated", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setImageUploading(false);
      });
    });
  };

  const updateOffer = async () => {
    let token = await JSON.parse(window.localStorage.getItem("persist:auth"))
      .token;
    let updatedOffer = {
      ...(title !== props.location.query.title && { title }),
      ...(description !== props.location.query.description && { description }),
      ...(type !== props.location.query.type && { type }),
      ...(detailed_description !==
        props.location.query.detailed_description && { detailed_description }),

      ...(imageURL !== props.location.query.imageURL && { image: imageURL }),
    };

    fetch(`${url}/instructions/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedOffer),
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Instructions Updated Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          props.history.push("/instructions");
        }
      })
      .catch(() => {
        toast.error("Ooops! Failed to update instructions, try again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  console.log(props);
  return (
    <div
      style={{
        background: "aliceblue",
        width: "50%",
        margin: "13px auto 14px auto",
        padding: 20,
        borderRadius: 30,
      }}
    >
      <h2 style={{ color: "rgb(172 29 29)", marginTop: 0 }}>
        Update Instructions
      </h2>
      <div
        style={{
          display: "grid",
          rowGap: 22,
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-evenly",
          }}
        >
          {imageURL !== "" && (
            <img
              src={imageURL}
              style={{ width: 100, height: 75, borderRadius: 5 }}
              alt="Item"
            />
          )}
          {uploadingImage ? (
            <p style={{ marginBottom: 0 }}>Uploading...</p>
          ) : image === "" ? (
            <>
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                className="form-input"
                onChange={(e) => {
                  var allowedExtensions = /\.(jpg|jpeg|png)$/i;
                  if (!allowedExtensions.exec(e.target.files[0].name)) {
                    alert(
                      "Invalid file type. Only JPG, JPEG and PNG files are allowed."
                    );
                  } else {
                    setImage(e.target.files[0]);
                    setImageURL(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          ) : (
            <IconButton
              style={{ background: "coral" }}
              onClick={() => updateImage()}
            >
              <Check />
            </IconButton>
          )}
        </div>
        <input
          name="title"
          type="text"
          required="true"
          placeholder="Title"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="description"
          type="text"
          required="true"
          placeholder="Description"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
          }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          name="detailed_description"
          required="true"
          placeholder="Enter Detailed Description Here"
          style={{
            padding: "10px 20px",
            borderRadius: 10,
          }}
          value={detailed_description}
          onChange={(e) => setDetailedDescription(e.target.value)}
        />

        <label for="types">Select Type:</label>
        <select
          id="types"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "10px 20px", borderRadius: 10 }}
        >
          <option value="premium">Premium</option>
          <option value="non-premium">Non Premium</option>
        </select>

        <button
          onClick={() => updateOffer()}
          disabled={
            title === "" || description === "" || detailed_description === ""
          }
          style={{
            padding: "10px 30px",
            borderRadius: 15,
            color:
              title === "" || description === "" || detailed_description === ""
                ? "black"
                : "white",
            background:
              title === "" || description === "" || detailed_description === ""
                ? "lightgray"
                : "cornflowerblue",
            borderWidth: 0,
            boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
            cursor:
              (title !== "" ||
                description !== "" ||
                detailed_description !== "") &&
              "pointer",
          }}
        >
          Update Instructions
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UpdateOffer);
