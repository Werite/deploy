import VideoRecordings from "../models/VideoRecordings.js";

const insertVideoRecURL = async(req, res,next) => {
    try {
        const user_id = req.user.user_id;
        const video_rec_url = req.body.video_rec_url;
        const pool_id = req.params.pool_id;
        // console.log(`video rec url ${video_rec_url}`)
        let videorecordings = new VideoRecordings(video_rec_url, user_id, pool_id);
    
        videorecordings = await videorecordings.save();
        // console.log(`video recordings save: ${videorecordings}`)

        return res.status(201).json({ message: "Video URL inserted successfully" });

      } catch (error) {

        console.log(error)
        return res.status(400).json({ message: error.sqlMessage })
    }
  }

  export {
    insertVideoRecURL
  }