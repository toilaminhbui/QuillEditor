import React,{useState} from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import ImageUploader from "quill-image-uploader"

Quill.register("modules/imageUploader", ImageUploader)

function QuillEditor({ setBody }) {
  const [checkLength,setCheckLength] = useState(null)
  const modules = {
    toolbar: { container },
    imageUploader: uploadCustom
  }
  const handleChange = (content, delta, source, editor) => {
    const contentText = editor.getText()
    console.log(contentText.replace(/ +/g, "").length)
  }
  return (
    <div>
      <ReactQuill
        placeholder="Write something amazing"
        onChange={handleChange}
        theme="snow"
        modules={modules}
      ></ReactQuill>
    </div>
  )
}
const container = [
  [{ header: [false,1, 2, 3, 4, 5, 6] }],
  [{ font: [] }],
  [{ 'header': 1 }, { 'header': 2 }],
  ["bold", "italic", "underline","strike", { color: [] }, { background: [] }],
  [{ indent: "-1" }, { indent: "+1" },{ align: [] },"blockquote","code-block"],
  ["link", "image","video"]
]
const uploadCustom = {
  upload: (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append("image", file)
      fetch(
        "https://api.imgbb.com/1/upload?key=0323bec481cc4969dcb8e048d53a61f2",
        {
          method: "POST",
          body: formData
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          resolve(result.data.url)
        })
        .catch((error) => {
          reject("Upload failed")
          console.error("Error:", error)
        })
    })
  }
}

export default QuillEditor
