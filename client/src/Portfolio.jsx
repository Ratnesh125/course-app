import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
export default function Portfolio() {
    return (
        <div style={{ height: 425 }}>
            <div  >
                <div style={{ marginTop: 180, color: "white", display: "flex", justifyContent: "space-around" }}>
                    <div>
                        <div style={{ fontSize: 50 }} >Hi,I'm</div>
                        <div style={{ fontSize: 110 }} >Ratnesh Bharti</div>
                        <div style={{ fontSize: 30 }} >Full Stack Web Developer</div>
                        <div style={{marginTop: 10}}>
                            <Button variant="text" size="large" style={{ color: "black" }} ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/640px-Github-desktop-logo-symbol.svg.png" width="50" height="50" />
                            </Button>
                            <Button variant="text" size="large" style={{ color: "black" }} ><img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" width="50" height="50" />
                            </Button>
                            <Button variant="text" size="large" style={{ color: "black" }} ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LeetCode_Logo_1.png/640px-LeetCode_Logo_1.png" width="50" height="50" />
                            </Button>
                            <Button variant="text" size="large" style={{ color: "black" }} ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Antu_gmail.svg/640px-Antu_gmail.svg.png" width="50" height="50" />
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img src="https://www.w3schools.com/html/img_girl.jpg" width="350" height="350" />
                    </div>
                </div>
            </div>
        </div>
    )
}