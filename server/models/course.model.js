import {model, Schema} from 'mongoose';

const courseSchema=new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: [8, 'Title must be atleast 8 characters'],
        maxLength: [59, 'Title should be less than 60 characters'],
    },
    description: {
        type: String,
        type: String,
        required: [true, 'Description is required'],
        minLength: [8, 'Description must be atleast 8 characters'],
        maxLength: [59, 'Description should be less than 60 characters'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    lectures: [{
        title: String,
        description: String,
        lecture: {
            public_id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    }],
    numbersOfLectures: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Course=new model('Course', courseSchema);

export default Course;
