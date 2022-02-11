import { Button, TextInput, Select } from "@contentstack/venus-components";
import VTable from "./components/vTable";
import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";

export function Popup() {
  const [message, setMessage] = useState("");
  const [tableOutput, setTableOutput] = useState(null);
  const [error, setError] = useState(null);
  const [extension, setExtension] = useState(null);
  const [output, setOutput] = useState({});
  const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [filteredData, setfData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [vvalue, updateVValue] = useState(null);

  useEffect(() => {
    const Fetchdata = () => {
      fetch(
        `https://cdn.contentstack.io/v3/content_types/blog/entries?environment=dev&locale=en-us&include_fallback=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            api_key: "blta617665c36cf7ddc",
            access_token: "cs25079a785563c044a1609e3d",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setData(data.entries);
          setfData(data.entries);
          console.log(data.entries);
          setLoading(false);
        });
    };
    Fetchdata();

    // eslint-disable-next-line no-restricted-globals
    if (self === top) {
      setError({
        message: "This extension can only be used in the Contentstack",
      });
    } else {
      ContentstackUIExtension.init().then((extension) => {
        setExtension(extension);
      });
    }

    console.log(extension)
  }, []);

  function onChangeHandler(data) {
    // const {value} = evt.currentTarget;
    //   const data = {
    //     "_version": 8,
    //     "locale": "en-us",
    //     "uid": "blt44a925443c7e3073",
    //     "ACL": {},
    //     "_in_progress": false,
    //     "author": "MC",
    //     "biography": "lorem ipsum dolor",
    //     "created_at": "2022-01-19T19:21:54.021Z",
    //     "created_by": "blt4aabe76cbc5c8676",
    //     "occupation": "Engineer",
    //     "tags": [
    //         "banana",
    //         "apple"
    //     ],
    //     "title": "article #3",
    //     "updated_at": "2022-01-26T19:43:01.187Z",
    //     "updated_by": "blt4aabe76cbc5c8676",
    //     "publish_details": {
    //         "environment": "blt946c626ebeb10800",
    //         "locale": "en-us",
    //         "time": "2022-01-26T19:43:02.353Z",
    //         "user": "blt4aabe76cbc5c8676"
    //     }
    // }
    setOutput(data);
    console.log(output);

    // we use the `opener` object that lives on a parent window
    // this object only exists if the current window has a child.
    window.opener.onSuccess(data);
    window.close(data);
  }

  if (!window.opener) {
    window.close();
  }

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  if (!data) {
    return <div className="App">Loading...</div>;
  }

  if (!filteredData) {
    return <div className="App">Loading...</div>;
  }

  function searching(i, query, param) {
    console.log(i, query, param);
    if (param === "select") {
      return i;
    }

    if (param !== "tags" && param !== "select") {
      if (i[param].toLowerCase().search(query.toLowerCase()) > -1) {
        return i;
      }
    }

    if (param === "tags") {
      if (i[param].join().toLowerCase().search(query.toLowerCase()) > -1) {
        return i;
      }
    }
  }

  function finalize() {
    if (vvalue == null) {
      setfData(data);
    }

    if (vvalue !== null) {
      setfData(data.filter((i) => searching(i, query, vvalue.value)));
    }
  }

  function clear() {
    setfData(data);
    updateVValue(null);
    setQuery("");
  }

  const handleValueUpdate = (data) => {
    updateVValue(data);

    if (data == null) {
      setQuery("");
      finalize();
    }
  };

  const handleTableOutput = (data) => {
    onChangeHandler(data);
    console.log(data);
  };

  // extension.field.setData([
  //   {
  //     "uid": data.data[0].uid,
  //     "_content_type_uid": "blog"
  //     }]);
  // console.log(extension.field)
  // setCurrentSelection(data.data[0]);
  console.log(filteredData);
  return (
    <div>
      <div className="container-1">
        <div className="row">
          <form>
            <TextInput
              type="text"
              value={query}
              placeholder="Query..."
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </form>

          <Select
            hideSelectedOptions
            maxMenuHeight={200}
            isClearable={true}
            noOptionsMessage={function noRefCheck() {}}
            onChange={handleValueUpdate}
            options={[
              {
                id: 0,
                label: "Title",
                value: "title",
              },
              {
                id: 1,
                label: "Author",
                value: "author",
              },
              {
                id: 2,
                label: "Biography",
                value: "biography",
              },
              {
                id: 3,
                label: "Occupation",
                value: "occupation",
              },
              {
                id: 4,
                label: "UID",
                value: "uid",
              },
              {
                id: 5,
                label: "Tags",
                value: "tags",
              },
            ]}
            placeholder="All"
            // selectLabel="Select"
            value={vvalue}
            width="200px"
          />
          <Button onClick={finalize}>Search</Button>
          <Button buttonType={"secondary"} onClick={clear}>
            Clear
          </Button>
        </div>

        {/* <Table filteredData={filteredData}></Table> */}
        {/* <input type="text" value={message} onChange={onChangeHandler} /> */}
        <div className="vtable">
          <VTable
            filteredData={filteredData}
            onSelectOutput={handleTableOutput}
          />
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// export class Popup extends React.Component {
//     constructor (props) {
//         super(props);

//         this.state = {
//             message: ""
//         }
//         this.onChangeHandler = this.onChangeHandler.bind(this);
//     }

//     componentDidMount () {
//         // this route should only be avaleable from a popup
//         if (!window.opener) {
//             window.close();
//         }
//     }

//     /**
//      * changes the value of the input.
//      *
//      * @param {import("react").ChangeEvent<HTMLInputElement>} evt
//      * @returns {void}
//      */
//     onChangeHandler (evt) {
//         const {value} = evt.currentTarget;

//         this.setState({message: value});

//         // we use the `opener` object that lives on a parent window
//         // this object only exists if the current window has a child.
//         window.opener.onSuccess(value)
//     }

//     render () {
//         const {message} = this.state;
//         return (
//             <div>
//                 <input type="text" value={message} onChange={this.onChangeHandler} />
//             </div>
//         )
//     }
// }
