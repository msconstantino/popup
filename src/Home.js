import React from "react";
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";
import { WindowOpener } from "./window-opener";
import { useState, useEffect } from "react";

export function Home() {
  const [message, setMessage] = useState({});
  const [error, setError] = useState(null);
  const [extension, setExtension] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (self === top) {
      setError({
        message: "This extension can only be used in the Contentstack",
      });
    } else {
      ContentstackUIExtension.init().then((extension) => {
        setExtension(extension);
        setMessage(extension.field.getData()[0])
        console.log(message)
      });
    }

  }, [message]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!extension) {
    return <p>Loading...</p>;
  }

  if (extension) {

  }

  function sonResponse(err, res) {
    if (res.title) {
      setMessage(res);
      extension.field.setData([
        {
          "uid": res.uid,
          "_content_type_uid": "blog"
        },
      ]);
    }
  }

//   console.log(message);
//   console.log(extension.field.getData());

  return (
    <div className="wrap">
      <header className="App-header">
        {/* {current.title} */}
        <h5>Current selected entry:</h5><p className="current"> {message.uid ?? "test"}</p>
        <WindowOpener url="http://localhost:3000/son" bridge={sonResponse}>
          Open Browser
        </WindowOpener>
      </header>
    </div>
  );
}

// import React from "react";
// import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";
// import { WindowOpener } from "./window-opener";

// export class Home extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       extension: "",
//       message: { title: "none" },
//     };

//     this.sonResponse = this.sonResponse.bind(this);
//   }

//   sonResponse(err, res) {
//     if (err) {
//       this.setState({ message: res });
//     }
//     this.setState({ message: res });
//   }

//   render() {
//     const { message } = this.state;
//     // const { extension } = this.state;

//     // ContentstackUIExtension.init().then((ext) => {
//     //   this.setState({ extension: ext });
//     // });

//     // extension.field.setData([
//     //   {
//     //     uid: message.uid,
//     //     _content_type_uid: "blog",
//     //   },
//     // ]);

//     return (
//       <div>
//         <header className="App-header">
//           {message.title}

//           <WindowOpener
//             url="http://localhost:3000/son"
//             bridge={this.sonResponse}
//           >
//             Open Browser
//           </WindowOpener>
//         </header>
//       </div>
//     );
//   }
// }
