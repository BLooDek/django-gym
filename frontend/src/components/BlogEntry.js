export default function BlogEntry({item}) {
	return (
		<>
		<div className="flex justify-center">
			<div className="blogEntry bg-gray-800 text-gray-300 w-2/3 text-center mt-16 py-4 px-12 rounded-xl shadow-xl">
				<p className="blogTitle text-4xl">{item.title}</p>
				<p className="blogMeta text-xs text-right">Dodane {item.publish} przez {item.author}</p>
				<p className="blogBody text-xl text-left">{item.body}</p>
			</div>
		</div>
		</>
	);
}
      //"title": "Nowy post", "id": 7, "author": "admin", "body": "elo", "publish": "2022-03-15 21:51:50"}
