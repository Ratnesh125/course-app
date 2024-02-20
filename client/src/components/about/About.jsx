import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

export default function About() {
    return (
        <div>
            <Card variant="outlined" style={{ backgroundColor: "black", height: 580 }}>
                <div style={{ display: "flex", justifyContent: "center", fontSize: 60, marginTop: 30 }}>About me</div>
                <div style={{ display: "flex", justifyContent: "space-around", margin: 30 }}>
                    <Card style={{ display: 'flex', height: 400, width: 900 }}>
                        <img src="https://www.w3schools.com/html/img_girl.jpg" width="350" height="350" style={{ margin: 25 }} />
                        <div style={{ margin: 50 }}>
                            <div style={{ fontSize: 20 }} >Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the
                                leap into electronic typesetting, remaining essentially
                                unchanged. It was popularised in the 1960s with the
                            </div>
                            <br />
                            <div>
                                <Button variant="contained">Download CV</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </Card>
        </div>
    )
}