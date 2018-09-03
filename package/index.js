const fxy = require('fxy/package/index')
const yaml = require('js-yaml')

const Metadata = load_meta
Metadata.data = get_data_from_text
Metadata.load = get_data_from_text
Metadata.read = read_file
Metadata.text = get_text_from_data
Metadata.write = write_file

//exports
module.exports = Metadata

//shared actions
function get_data_from_text(text, safe = false){ return safe === true ? yaml.load(text):yaml.load(text) }

function get_text_from_data(data){ return yaml.dump(data) }

function load_meta(location){
	const extension = fxy.extension(location)
	if(!extension) location = fxy.join(location, `${fxy.folder_name(location)}.meta`)
	else if(extension !== 'meta') location = location.replace(extension, 'meta')
	//exports
	return fxy.exists(location) ? read_file(location):null
}

function read_file(location){ return get_data_from_text(fxy.read_file_sync(location, 'utf8')) }

function write_file(location, data){ return fxy.write_file_sync(location, get_text_from_data(data), 'utf8') }
