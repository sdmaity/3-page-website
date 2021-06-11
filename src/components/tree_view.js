function TreeView(props) {
	let handleClick = function(e) {
        let id = e.target.dataset.id;
        let open = {...props.open};
        if (open[id]) {
            delete open[id];
        } else {
            open[id] = 1;
        }
    props.setOpen(open);
  }
  let treeView = props.json.map(obj => {
  	let hasChild = obj.children && (obj.children.length > 0);
  	return (<div key={obj.id} id={obj.id} className="parent">
    	<div>
            {hasChild && (<span data-id={obj.id} onClick={handleClick}>{props.open[obj.id] ? "-" : "+"}</span>)}
            {obj.title}
        </div>
      {hasChild && <TreeView json={obj.children} open={props.open} setOpen={props.setOpen} isOpen={props.open[obj.id]}/>}
    </div>);
  
  });
  return (<div className={props.isOpen ? "" : "hide"}>
  	{treeView}
  </div>);
}

function App() {
	let json = [
    {
      "id": 1,
      "title": "Applications",
      "children": [
        {
          "id": 11,
          "title": "App 1",
          "children": []
        },
        {
          "id": 12,
          "title": "App 2"
        }
      ]
    },
    {
      "id": 2,
      "title": "Documents",
      "children": [
        {
          "id": 21,
          "title": "Doc 1",
          "children": [
            {
              "id": 211,
              "title": "Doc 11"
            },
            {
              "id": 212,
              "title": "Doc 22",
              "children": []
            }
          ]
        },
        {
          "id": 22,
          "title": "Doc 2",
          "children": []
        }
      ]
    }
  ];
  const [open, setOpen] = React.useState({});
  return (
  	<div>
    	<TreeView json={json} open={open} setOpen={setOpen} isOpen={1}/>
    </div>
  )
}


ReactDOM.render(<App />, document.querySelector("#app"))
