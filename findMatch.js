import { useState } from "react";

function findMatch() {
    const [inputs, setInputs] = useState({mbti: "", genre: ""});
    //const [mbti, setMbti] = useState({});
    //const [genres, setGenres] = useState({});
    
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateInputs(inputs);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Inputs submitted successfully!');
        } else {
            console.log('Inputs submission failed due to validation errors.');
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value,});
    };

    const validateInputs = (data) => {
        const errors = {};
        
        if (!data.mbti.trim()) {
            errors.mbti = 'MBTI is required';
        } else if (data.mbti.length != 4) {
            errors.mbti = 'MBTI must be 4 letters long';
        }else {
            const [c1, c2, c3, c4] = value.toLowerCase();
        }
        const isValid =
            ['e', 'i'].includes(c1) &&
            ['s', 'n'].includes(c2) &&
            ['t', 'f'].includes(c3) &&
            ['j', 'p'].includes(c4);

        if (!isValid) {
            errors.email = 'Email is invalid';
        }
        return errors;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="mbti">What is your MBTI?</label>
                <input type="text" id="mbti" name="mbti" value={inputs.mbti} onChange={handleChange} />
                {errors.mbti && (<span>{errors.mbti}</span>)}
            </div>
            <div>
                <label htmlFor="genre">What is your favorite anime genre?</label>
                <select id="genre" name="genre" value={inputs.genre} onChange={handleChange}>
                    <option value="Shounen">Shounen</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Seinen">Seinen</option>
                    <option value="Supernatural">Supernatural</option>
                    <option value="Sports">Sports</option>
                    <option value="Mecha">Mecha</option>
                    <option value="Psychological">Psychological</option>
                    <option value="Shoujo">Shoujo</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Drama">Drama</option>
                    <option value="Slice of Life">Slice of Life</option>
                </select>
            </div>

            <input type="submit" value="Search" />
        </form>
    );
}

export default findMatch;
