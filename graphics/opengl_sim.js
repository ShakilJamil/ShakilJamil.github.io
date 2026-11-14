
const GL_COLOR_BUFFER_BIT = 16384;
const GL_DEPTH_BUFFER_BIT = 256;
const GL_POLYGON = 'GL_POLYGON';
const GL_QUADS = 'GL_QUADS';
const GL_TRIANGLE_FAN = 'GL_TRIANGLE_FAN';
const GL_LINES = 'GL_LINES';
const GL_LINE_LOOP = 'GL_LINE_LOOP';
const GL_POINTS = 'GL_POINTS';
const GL_LIGHTING = 'GL_LIGHTING';
const GL_LIGHT0 = 'GL_LIGHT0';
const GL_LIGHT_MODEL_AMBIENT = 'GL_LIGHT_MODEL_AMBIENT';
const GL_SMOOTH = 'GL_SMOOTH';
const GLUT_BITMAP_TIMES_ROMAN_24 = '24px';

    /*
    Color Codes:
    gl.glColor3f(1.0, 1.0, 1.0); // White
    gl.glColor3f(0.0, 0.0, 0.0); //Black

    gl.glColor3f(1.0, 0.0, 0.0); // Red
    gl.glColor3f(0.0, 0.0, 1.0); // Blue
    gl.glColor3f(0.0, 1.0, 0.0); //Green
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green
    gl.glColor3f(1.0, 1.0, 0.0); // Yellow
    gl.glColor3f(0.8, 0.8, 0.0);//type yellow
    gl.glColor3f(0.6, 1.0, 1.0); // Light Sky

    gl.glColor3f(0.6, 0.6, 0.5);//Ash
    gl.glColor3f(0.5, 1.0, 1.0);//cyan
    gl.glColor3f(0.1, 0.0, 0.0);//Brown
    gl.glColor3f(1.0, 0.5, 0.0);//Orange
    gl.glColor3f(1.0, 0.0, 1.0);//Purple
    gl.glColor3f(0.4, 0.3, 0.1); // Light chocolate

    gl.glColor3f(0.5, 0.5, 0.5);//Violet
    gl.glColor3f(2.0, 0.5, 1.0);//Lilac
    gl.glColor3f(0.1, 0.1, 0.0);//Bronze
    gl.glColor3f(0.0, 0.5, 0.5);//Blue-Green
    gl.glColor3f(0.0, 0.5, 1.0);//baby Blue
    gl.glColor3f(0.5, 0.5, 0.5);//grey


    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glColor3f(0.1, 0.0, 0.1);//Dark Purple
    gl.glColor3f(0.0, 0.1, 0.1);//Dark blue
    gl.glColor3f(0.0, 0.1, 0.0);//Forest Green
    */













var i;
var radius9 =0.10;
var triangleAmount = 100; //# of lines used to draw circle
var twicePi = 2.0 * Math.PI;

///For cloud 1
var position = 0.0;
var speed = 0.01;

///For cloud 2
var position2 = 0.0;
var speed2 = 0.015;

///For sun
var position3 = 0.0;
var speed3 = 0.0025;

///For football
var position4 = -0.10;
var speed4 = 0.05;

///for Boat 1
var position9 = 0.0;
var speed9 = 0.01;

///For boat 2
var position10 = 0.0;
var speed10 = 0.0075;

///For Car
var position11 = 0.0;
var speed11 = 0.01;

///For man going bazar
var position12 = 0.0;
var speed12 = 0.005;








/* Initialize OpenGL Graphics */


/* Handler for window-repaint event. Call back when the window first appears and
whenever the window needs to be re-painted. */


///********************************************Drawing Cloud 1*******************************************///
function cloud1(gl)
{
    ///********************************************Drawing Cloud 1 **********************************///

	gl.glPushMatrix();
    gl.glTranslatef(position,0.0, 0.0);

        //circle1
        var x1=-0.5; var y1=0.90; var radius1 =-0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x1, y1); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x1 + (radius1 * Math.cos(i *  twicePi / triangleAmount)),
                            y1 + (radius1 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        //circle2
        var x2=-0.5; var y2=0.85; var radius2 =-0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x2, y2); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x2 + (radius2 * Math.cos(i *  twicePi / triangleAmount)),
                            y2 + (radius2 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();
//circle3
        var x3=-0.45; var y3=0.90; var radius3 =-0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x3, y3); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x3 + (radius3 * Math.cos(i *  twicePi / triangleAmount)),
                            y3 + (radius3 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        //circle4
        var x4=-0.45; var y4=0.85; var radius4 =-0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x4, y4); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x4 + (radius4 * Math.cos(i *  twicePi / triangleAmount)),
                            y4 + (radius4 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        //circle5
        var x5=-0.55; var y5=0.87; var radius5 =-0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x5, y5); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x5 + (radius5 * Math.cos(i *  twicePi / triangleAmount)),
                            y5 + (radius5 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        //circle6
        var x6=-0.42; var y6=0.87; var radius6 =-0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x6, y6); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x6 + (radius6 * Math.cos(i *  twicePi / triangleAmount)),
                            y6 + (radius6 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();
        gl.glPopMatrix();

}

///****************************************Drawing Cloud 2***************************************///
function cloud2(gl)
{
    gl.glPushMatrix();
    gl.glTranslatef(position2,0.0, 0.0);

        //circle12
        var x12=0.95; var y12=0.90; var radius12 =0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x12, y12); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x12 + (radius12 * Math.cos(i *  twicePi / triangleAmount)),
                            y12 + (radius12 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();
        //circle13
        var x13=0.90; var y13=0.90; var radius13 =0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x13, y13); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x13 + (radius13 * Math.cos(i *  twicePi / triangleAmount)),
                            y13 + (radius13 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();
        //circle14
        var x14=0.87; var y14=0.88; var radius14 =0.04;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x14, y14); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x14 + (radius14 * Math.cos(i *  twicePi / triangleAmount)),
                            y14 + (radius14 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();
        //circle15
         var x15=0.92; var y15=0.88; var radius15 =0.05;
        gl.glColor3f(1.0, 1.0, 1.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x15, y15); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x15 + (radius15 * Math.cos(i *  twicePi / triangleAmount)),
                            y15 + (radius15 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();
   gl.glPopMatrix();
}

///*******************************************Boat-1 Drawing***********************************///
function boat1(gl){
    gl.glPushMatrix();
    gl.glTranslatef(position9,0.0, 0.0);


	gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0,0.0,0.0);//black-base of the boat

    gl.glVertex2f(-0.85,0.25);

    gl.glVertex2f(-0.65,0.25);

    gl.glVertex2f(-0.65,0.20);

    gl.glVertex2f(-0.85,0.20);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0,0.0,0.0);//black front nose of the boat

    gl.glVertex2f(-0.65,0.25);

    gl.glVertex2f(-0.60,0.25);

    gl.glVertex2f(-0.65,0.20);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0,0.0,0.0);//black rear nose of the boat

    gl.glVertex2f(-0.85,0.25);

    gl.glVertex2f(-0.90,0.25);

    gl.glVertex2f(-0.85,0.20);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.9,0.5,0.2);//hood-1 of the boat-1

    gl.glVertex2f(-0.85,0.25);

    gl.glVertex2f(-0.80,0.35);

    gl.glVertex2f(-0.70,0.35);

    gl.glVertex2f(-0.74,0.25);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.6,0.3,0.3);//hood-2 of the boat-1

    gl.glVertex2f(-0.74,0.25);

    gl.glVertex2f(-0.70,0.35);

    gl.glVertex2f(-0.65,0.25);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//stick of flag

    gl.glVertex2f(-0.65,0.25);

    gl.glVertex2f(-0.65,0.50);

    gl.glVertex2f(-0.645,0.50);

    gl.glVertex2f(-0.645,0.25);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 1.0, 0.0);//flag

    gl.glVertex2f(-0.65,0.50);

    gl.glVertex2f(-0.70,0.45);

    gl.glVertex2f(-0.65,0.40);

    gl.glEnd();


    gl.glPopMatrix();

}

///*******************************************Boat-2 Drawing***********************************///
function boat2(gl){
    gl.glPushMatrix();
    gl.glTranslatef(position10,0.0, 0.0);


        gl.glBegin(GL_POLYGON);

        gl.glColor3f(0.0, 0.0, 0.0);//black-base of the boat-2

        gl.glVertex2f(0.50,0.10);

        gl.glVertex2f(0.45,0.15);

        gl.glVertex2f(0.85,0.15);

        gl.glVertex2f(0.80,0.10);

        gl.glEnd();


        gl.glBegin(GL_POLYGON);

        gl.glColor3f(0.6,0.3,0.3);//hood-1 of the boat-2

        gl.glVertex2f(0.65,0.15);

        gl.glVertex2f(0.60,0.25);

        gl.glVertex2f(0.72,0.25);

        gl.glVertex2f(0.77,0.15);

        gl.glEnd();


        gl.glBegin(GL_POLYGON);

        gl.glColor3f(0.8,0.4,0.3 );//hood-2 of the boat-2

        gl.glVertex2f(0.65,0.15);

        gl.glVertex2f(0.60,0.25);

        gl.glVertex2f(0.56,0.15);

        gl.glEnd();


        gl.glBegin(GL_POLYGON);

        gl.glColor3f(0.0, 0.0, 0.0);//stick of boat-2

        gl.glVertex2f(0.555,0.15);

        gl.glVertex2f(0.555,0.45);

        gl.glVertex2f(0.56,0.45);

        gl.glVertex2f(0.56,0.15);

        gl.glEnd();


        gl.glBegin(GL_POLYGON);

        gl.glColor3f(0.8,0.8,0.7);//paal

        gl.glVertex2f(0.555,0.45);

        gl.glVertex2f(0.45,0.20);

        gl.glVertex2f(0.54,0.20);

        gl.glEnd();


        gl.glBegin(GL_LINES);

        gl.glColor3f(0.0, 0.0, 0.0);//rope-1

        gl.glVertex2f(0.54,0.20);

        gl.glVertex2f(0.555,0.15);

        gl.glEnd();


        gl.glBegin(GL_LINES);

        gl.glColor3f(0.0, 0.0, 0.0);//rope-2

        gl.glVertex2f(0.45,0.20);

        gl.glVertex2f(0.555,0.15);

        gl.glEnd();


        gl.glBegin(GL_LINES);

        gl.glColor3f(0.0, 0.0, 0.0);//rope-3

        gl.glVertex2f(0.56,0.45);

        gl.glVertex2f(0.85,0.15);

        gl.glEnd();

    gl.glPopMatrix();


}

///*******************************************Tank Drawing***********************************///
function car(gl){

     gl.glPushMatrix();
    gl.glTranslatef(position11,0.0, 0.0);

        //Shakil Jamil Mrida
        gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
        gl.glColor3f(0.0, 0.7, 0.2);

        gl.glVertex2f(-0.855, -0.66);
        gl.glVertex2f(-0.885, -0.73);
        gl.glVertex2f(-0.815, -0.79);
        gl.glVertex2f(-0.50, -0.72);
        gl.glVertex2f(-0.47, -0.67);
        gl.glVertex2f(-0.50, -0.625);
        gl.glVertex2f(-0.58, -0.60);
        gl.glVertex2f(-0.81, -0.62);
        gl.glEnd();
         gl.glBegin(GL_QUADS);//tank upper
        gl.glColor3f(0.0, 0.7, 0.2);
        gl.glVertex2f(-0.81, -0.62);
        gl.glVertex2f(-0.58, -0.60);
        gl.glVertex2f(0-.60, -0.52);
        gl.glVertex2f(-0.81, -0.52);
        gl.glEnd();

         gl.glBegin(GL_QUADS);//tank upper join
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glVertex2f(-0.81, -0.62);
        gl.glVertex2f(-0.58, -0.60);
        gl.glVertex2f(0-.59, -0.58);
        gl.glVertex2f(-0.81, -0.58);
        gl.glEnd();

        gl.glBegin(GL_QUADS);//tank gun stand
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glVertex2f(-0.72, -0.52);
        gl.glVertex2f(-0.66, -0.52);
        gl.glVertex2f(0-.655, -0.50);
        gl.glVertex2f(-0.72, -0.50);
        gl.glEnd();

        gl.glBegin(GL_QUADS);//tank gun
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glVertex2f(-0.72, -0.50);
        gl.glVertex2f(-0.55, -0.50);
        gl.glVertex2f(0-.55, -0.47);
        gl.glVertex2f(-0.72, -0.47);
        gl.glEnd();

        //Tank window 1
        gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
        gl.glColor3f(0.0, 0.0, 0.0);//peach
        gl.glVertex2f(-0.79, -0.63);
        gl.glVertex2f(-0.82, -0.70);
        gl.glVertex2f(-0.685, -0.69);
        gl.glVertex2f(-0.69, -0.63);
        gl.glEnd();

        //tank window 2
        gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
        gl.glColor3f(0.0, 0.0, 0.0);//peach
        gl.glVertex2f(-0.67, -0.625);
        gl.glVertex2f(-0.66, -0.69);
        gl.glVertex2f(-0.52, -0.68);
        gl.glVertex2f(-0.58, -0.62);
        gl.glEnd();

        //tank Wheel
        var x7=-0.55; var y7=-0.75; var radius7 =-0.04;
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x7, y7); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x7 + (radius7 * Math.cos(i *  twicePi / triangleAmount)),
                            y7 + (radius7 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        var x10=-0.55; var y10=-0.75; var radius10 =-0.03;
        gl.glColor3f(0.5, 0.5, 0.5);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x10, y10); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x10 + (radius10 * Math.cos(i *  twicePi / triangleAmount)),
                            y10+ (radius10 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        //Tank Whee2
        var x8=-0.77; var y8=-0.76; var radius8 =0.04;
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x8, y8); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x8 + (radius8 * Math.cos(i *  twicePi / triangleAmount)),
                            y8 + (radius8 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

        var x11=-0.77; var y11=-0.76; var radius11 =0.03;
        gl.glColor3f(0.5, 0.5, 0.5);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x11, y11); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x11 + (radius11 * Math.cos(i *  twicePi / triangleAmount)),
                            y11+ (radius11 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

    gl.glPopMatrix();

}

///***************************************Drawing man going beside*******************************///
function manGoing(gl)
{
    gl.glPushMatrix();
    gl.glTranslatef(position12,0.0, 0.0);

        gl.glBegin(GL_QUADS);//(body)
        gl.glColor3f(0.0, 0.0, 1.0);
        gl.glVertex2f(-0.57, -0.50);
        gl.glVertex2f(-0.51, -0.50);
        gl.glVertex2f(0-.51, -0.39);
        gl.glVertex2f(-0.57, -0.39);
         gl.glEnd();

        gl.glBegin(GL_QUADS);//legr)
        gl.glColor3f(0.1, 0.1, 0.1);
        gl.glVertex2f(-0.57, -0.50);
        gl.glVertex2f(-0.54, -0.50);
        gl.glVertex2f(0-.56, -0.60);
        gl.glVertex2f(-0.57, -0.60);
        gl.glEnd();

        gl.glBegin(GL_QUADS);//legl)
        gl.glColor3f(0.1, 0.1, 0.1);
        gl.glVertex2f(-0.54, -0.50);
        gl.glVertex2f(-0.51, -0.50);
        gl.glVertex2f(0-.51, -0.60);
        gl.glVertex2f(-0.52, -0.60);

        gl.glEnd();


       /* gl.glBegin(GL_QUADS);//(hand1)<---
        gl.glColor3f(0.0, 0.0, 1.0);
        gl.glVertex2f(-0.57, -0.39);
        gl.glVertex2f(-0.57, -0.43);
        gl.glVertex2f(0-.61, -0.47);
        gl.glVertex2f(-0.60, -0.47);
        gl.glEnd();*/

        gl.glBegin(GL_QUADS);//gun
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glVertex2f(-0.51, -0.39);
        gl.glVertex2f(-0.51, -0.42);
        gl.glVertex2f(0-.43, -0.43);
        gl.glVertex2f(-0.44, -0.40);
        gl.glEnd();

        gl.glBegin(GL_QUADS);//(hand2)--->
        gl.glColor3f(0.0, 0.0, 1.0);
        gl.glVertex2f(-0.51, -0.39);
        gl.glVertex2f(-0.51, -0.43);
        gl.glVertex2f(0-.47, -0.43);
        gl.glVertex2f(-0.48, -0.44);
        gl.glEnd();



        //head
        var x60=-0.54; var y60=-0.37; var radius60=0.02;

        gl.glColor3f(0.5, 0.5, 0.5); //Green

        gl.glBegin(GL_TRIANGLE_FAN);

            gl.glVertex2f(x60, y60); // center of circle

            for(i = 0; i <= triangleAmount;i++) {

                gl.glVertex2f( x60 + (radius60 * Math.cos(i *  twicePi / triangleAmount)),

                            y60+ (radius60 * Math.sin(i * twicePi / triangleAmount)) );

            }
        gl.glEnd();

    gl.glPopMatrix();
}


function point(gl, c1, c2){
         gl.glPointSize(1.5);
    gl.glBegin(GL_POINTS);

    gl.glColor3ub(255,255,255);
    gl.glVertex2f(c1, c2);
    gl.glEnd();
}

///***************************************Drawing Stars*******************************///
function stars(gl)
{
      point(gl, -.93, .83);    ///recursive call
      point(gl, -.85, .77);
      point(gl, -.72, .70);
      point(gl, -.74, .90);
      point(gl, -.67, .86);
      point(gl, -.61, .67);
      point(gl, -.55, .59);
      point(gl, -.51, .66);
      point(gl, -.47, .84);
      point(gl, -.43, .95);
      point(gl, -.39, .75);
      point(gl, -.33, .55);
      point(gl, -.25, .68);
      point(gl, -.20, .81);
      point(gl, -.17, .74);
      point(gl, -.12, .93);
      point(gl, -.08, .67);
      point(gl, -.04, .97);
      point(gl, .06, .73);
      point(gl, .02, .55);
      point(gl, .93, .83);
      point(gl, .85, .77);
      point(gl, .72, .70);
      point(gl, .74, .90);
      point(gl, .67, .86);
      point(gl, .61, .67);
      point(gl, .55, .59);
      point(gl, .51, .66);
      point(gl, .47, .84);
      point(gl, .43, .95);
      point(gl, .39, .75);
      point(gl, .33, .55);
      point(gl, .25, .68);
      point(gl, .20, .81);
      point(gl, .17, .74);
      point(gl, .12, .93);

}

/// move cloud1

///move cloud 2

///move sun


///move bullet


///move boat1


///move boat2



///move man going



///move Car



function displayProposal(gl)
{
    gl.glClearColor(0.0, 1.0, 1.0, 1.0); //light blue
    gl.glClear(GL_COLOR_BUFFER_BIT);

    gl.glColor3f(0.0,0.0,0.0);

    gl.renderBitmapString(-0.30, 0.90, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "American International University-Bangladesh (AIUB)");
    gl.renderBitmapString(-0.18, 0.80, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "Computer Graphics Project [I]");
    gl.renderBitmapString(-0.31, 0.70, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "Project Title: Liberation's Canvas: A Graphic Tale of Freedom's War ");
    gl.renderBitmapString(-0.20, 0.60, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "Course teacher: Dipta Justin Gomes");
    gl.renderBitmapString(-0.5, 0.50, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "Group Members:");

    gl.renderBitmapString(-0.5, 0.40, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "1.Name: Shakil Jamil Mrida");
    gl.renderBitmapString(-0.5, 0.30, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "ID: 22-47275-1");

    gl.renderBitmapString(-0.5, 0.20, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "2.Name: Nowrin Tasnim");
    gl.renderBitmapString(-0.5, 0.10, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "ID: 22-47280-1");

    gl.renderBitmapString(-0.5, 0.00, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "3.Name: Hasibur Rahman Rahim");
    gl.renderBitmapString(-0.5, -0.10, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "ID: 22-47044-1");


    gl.renderBitmapString(-0.70, -0.80, 0.0, GLUT_BITMAP_TIMES_ROMAN_24, "To see the day view, please press 'd', for night view, press'n' and to back to proposal page, press 'p' ");


    gl.glFlush();
}

function displayDay_view(gl)
{
    gl.glClear(GL_COLOR_BUFFER_BIT);   // Clear the color buffer with current clearing color

    ///*******************************************Drawing River***********************************///
    gl.glBegin(GL_QUADS);  // These vertices form a closed polygon
	gl.glColor3f(0.6, 1.0, 1.0); // Light Sky
	gl.glVertex2f(-1.0, -0.20);
	gl.glVertex2f(1.0, 0.0);
	gl.glVertex2f(1.0, 0.48);
	gl.glVertex2f(-1.0, 0.45);
	gl.glEnd();


	///*******************************************Drawing Sky***********************************///
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
	gl.glColor3f(0.6, 1.0, 1.0); // Light Sky
	gl.glVertex2f(-1.0, 1.0);
	gl.glVertex2f(1.0, 1.0);
	gl.glVertex2f(1.0, 0.60);
	gl.glVertex2f(-1.0, 0.60);
	gl.glEnd();


	///Drawing Sun
	gl.glPushMatrix();
    gl.glTranslatef(position3,0.0, 0.0);

    var x9=-0.85; var y9=0.85; var radius9 =0.10;

	gl.glColor3f(1.0, 0.75, 0.0);
	gl.glBegin(GL_TRIANGLE_FAN);
		gl.glVertex2f(x9, y9); // center of circle
		for(i = 0; i <= triangleAmount;i++) {
			gl.glVertex2f( x9 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),
                        y9 + (radius9 * Math.sin(i * twicePi / triangleAmount)) );
		}
	gl.glEnd();
	gl.glPopMatrix();

        ///calling cloud1
        cloud1(gl);

        ///cloud2 calling
        cloud2(gl);

	///**********************************************Drawing Hill****************************************///
    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 1
    gl.glVertex2f(-1.0, 0.68);
    gl.glVertex2f(-0.89, 0.80);
    gl.glVertex2f(-0.60, 0.60);
    gl.glVertex2f(-1.00, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green for the hill 2
    gl.glVertex2f(-.84, 0.60);
    gl.glVertex2f(-0.61, 0.79);
    gl.glVertex2f(-0.30, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 3
    gl.glVertex2f(-.60, 0.60);
    gl.glVertex2f(-0.37, 0.75);
    gl.glVertex2f(-0.18, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green for the hill 4
    gl.glVertex2f(-.34, 0.60);
    gl.glVertex2f(-0.13, 0.80);
    gl.glVertex2f(0.12, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 5
    gl.glVertex2f(0.05, 0.60);
    gl.glVertex2f(0.20, 0.74);
    gl.glVertex2f(0.39, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 6
    gl.glVertex2f(0.39, 0.60);
    gl.glVertex2f(0.62, 0.79);
    gl.glVertex2f(0.92, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green for the hill 7
    gl.glVertex2f(0.20, 0.60);
    gl.glVertex2f(0.42, 0.81);
    gl.glVertex2f(0.68, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Green for the hill 8
    gl.glVertex2f(0.73, 0.60);
    gl.glVertex2f(1.00, 0.60);
    gl.glVertex2f(0.94, 0.68);
    gl.glEnd();

    ///river opposite view///

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.2,0.4, 0.0);
    gl.glVertex2f(-1.00, 0.60);
    gl.glVertex2f(-1.00, 0.45);
    gl.glVertex2f(1.00, 0.48);
    gl.glVertex2f(1.00, 0.60);
    gl.glEnd();

gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.5, 0.4, 0.0);
    gl.glVertex2f(-1.00, 0.50);
    gl.glVertex2f(-1.00, 0.45);
    gl.glVertex2f(1.00, 0.48);
    gl.glVertex2f(1.00, 0.52);
    gl.glEnd();

///river tree///


gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.5, 0.4, 0.0);
    gl.glVertex2f(-.95, 0.55);
    gl.glVertex2f(-.93, 0.55);
    gl.glVertex2f(-.93, 0.50);
    gl.glVertex2f(-.95, 0.50);
    gl.glEnd();


    var x71=-0.94; var y71=0.57;var radius71 =0.04;


    gl.glColor3f(0.2, .8, 0.3); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x71, y71); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x71 + (radius71 * Math.cos(i *  twicePi / triangleAmount)),

                        y71+ (radius71 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


    var x70=-0.94; var y70=0.56;var radius70 =0.025;


    gl.glColor3f(0.2, .5, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x70, y70); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x70 + (radius70 * Math.cos(i *  twicePi / triangleAmount)),

                        y70+ (radius70 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


    ///*******************************************Drawing River***********************************///
    gl.glBegin(GL_QUADS);  // These vertices form a closed polygon
	gl.glColor3f(0.6, 1.0, 1.0); // Light Sky
	gl.glVertex2f(-1.0, -0.20);
	gl.glVertex2f(1.0, 0.0);
	gl.glVertex2f(1.0, 0.48);
	gl.glVertex2f(-1.0, 0.45);
	gl.glEnd();


        ///calling boat1
        boat1(gl);

        ///Calling boat2
        boat2(gl);


	///***************************************Drawing Grassy Ground*****************************///
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.9, 0.2); //Green
	gl.glVertex2f(-1.0, -0.20);
	gl.glVertex2f(1.0, 0.00);
	gl.glVertex2f(1.0, -1.0);
	gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();

	///Drawing House

	//Drawing Overall Shape
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.8, 0.3);//Hay Yellow
	gl.glVertex2f(-0.90, -0.15);
	gl.glVertex2f(-0.65, -0.15);
	gl.glVertex2f(-0.59, -0.24);
	gl.glVertex2f(-0.60, -0.24);
	gl.glVertex2f(-0.60, -0.37);
    gl.glVertex2f(-0.72, -0.40);
    gl.glVertex2f(-0.95, -0.40);
	gl.glVertex2f(-0.95, -0.24);
	gl.glVertex2f(-0.98, -0.24);
	gl.glEnd();


	//drawing roof
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.6, 0.6, 0.1);
    gl.glVertex2f(-0.73, -0.24);
    gl.glVertex2f(-0.65, -0.15);
    gl.glVertex2f(-0.59, -0.24);
	gl.glEnd();

	//drawing Door Side
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.6, 0.6, 0.5);//Ash
	gl.glVertex2f(-0.72, -.38);
	gl.glVertex2f(-0.72, -.24);
	gl.glVertex2f(-0.60, -.24);
	gl.glVertex2f(-0.60, -.36);
	gl.glEnd();

	//drawing Front Side
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 0.8);//Off White
    gl.glVertex2f(-0.95, -0.24);
    gl.glVertex2f(-0.72, -0.24);
    gl.glVertex2f(-0.72, -0.38);
    gl.glVertex2f(-0.95, -0.38);
	gl.glEnd();

	//Drawing Window 1
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-0.92, -.28);
	gl.glVertex2f(-0.92, -.33);
	gl.glVertex2f(-0.87, -.33);
	gl.glVertex2f(-0.87, -.28);
	gl.glEnd();

	//Drawing Window 2
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-0.80, -.28);
	gl.glVertex2f(-0.80, -.33);
	gl.glVertex2f(-0.75, -.33);
	gl.glVertex2f(-0.75, -.28);
	gl.glEnd();

	//Drawing Door
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-0.68, -.28);
	gl.glVertex2f(-0.68, -.37);
	gl.glVertex2f(-0.64, -.37);
	gl.glVertex2f(-0.64, -.28);
	gl.glEnd();

	//drawing Border
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.5, 0.5, 0.5);//grey
    gl.glVertex2f(-0.72, -0.40);
    gl.glVertex2f(-0.97, -0.40);
	gl.glVertex2f(-0.97, -0.38);
	gl.glVertex2f(-0.72, -0.38);
	gl.glEnd();

	//drawing Border
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0); //Black
	gl.glVertex2f(-0.72, -0.38);
	gl.glVertex2f(-0.58, -0.35);
    gl.glVertex2f(-0.58, -0.37);
	gl.glVertex2f(-0.72, -0.40);
	gl.glEnd();


	///Drawing Tree

	//Drawing Log Shape
	gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.4, 0.3, 0.1); // Light chocolate

	gl.glVertex2f(-0.43, -0.30);
	gl.glVertex2f(-0.46, -0.37);
	gl.glVertex2f(-0.46, -0.31);
	gl.glVertex2f(-0.55, -0.35);
	gl.glVertex2f(-0.49, -0.30);
	gl.glVertex2f(-0.47, -0.26);
	gl.glVertex2f(-0.46, -0.20);
	gl.glVertex2f(-0.48, -0.10);
	gl.glVertex2f(-0.50, -0.05);
	gl.glVertex2f(-0.46, -0.09);
	gl.glVertex2f(-0.46, -0.05);
	gl.glVertex2f(-0.44, -0.05);
	gl.glVertex2f(-0.43, -0.09);
	gl.glVertex2f(-0.40, -0.05);
	gl.glVertex2f(-0.38, -0.05);
	gl.glVertex2f(-0.39, -0.10);
	gl.glVertex2f(-0.39, -0.15);
	gl.glVertex2f(-0.38, -0.20);
	gl.glVertex2f(-0.38, -0.26);
	gl.glVertex2f(-0.37, -0.30);
	gl.glVertex2f(-0.32, -0.35);
	gl.glVertex2f(-0.39, -0.31);
	gl.glVertex2f(-0.38, -0.37);

	gl.glEnd();


	///Drawing tree leaf
    //circle 7 middle

    var x27=-0.44; var y27=0.14;

    gl.glColor3f(0.0, 0.4, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x27, y27); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x27 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y27+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

	//circle 1

    var x20=-0.62; var y20=0.10;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x20, y20); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x20 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y20+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

    //circle 2

    var x21=-0.51; var y21=0.23;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x21, y21); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x21 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y21+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

    //circle 3

    var x22=-0.36; var y22=0.2;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x22, y22); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x22 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y22+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


	//circle 4

    var x24=-0.24; var y24=0.11;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x24, y24); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x24 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y24+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

	//circle 5

    var x25=-0.36; var y25=0.01;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x25, y25); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x25 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y25+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

    //circle 6

    var x26=-0.53; var y26=0.02;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x26, y26); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x26 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y26+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


	///Calling man going function
        manGoing(gl);


    ///grass2
    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 1.0, 0.0); // Green grass

    gl.glVertex2f(-0.05, -0.21);
    gl.glVertex2f(-0.035, -0.225);
    gl.glVertex2f(0.03, -0.21);
    gl.glVertex2f(0.01, -0.21);
    gl.glVertex2f(0.00, -0.20);
    gl.glVertex2f(0.05, -0.14);
    gl.glVertex2f(-0.02, -0.20);
    gl.glVertex2f(0.02, -0.10);
    gl.glVertex2f(-0.03, -0.20);
    gl.glVertex2f(-0.04, -0.10);
    gl.glVertex2f(-0.05, -0.20);
    gl.glVertex2f(-0.09, -0.12);
    gl.glVertex2f(-0.06, -0.22);
    gl.glEnd();

	///hiding place 1

	//bench seat
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.5, 0.3);//peach

	gl.glVertex2f(-0.25, -0.16);
	gl.glVertex2f(-0.28, -0.25);
    gl.glVertex2f(-0.02, -0.25);
	gl.glVertex2f(-0.05, -0.16);
	gl.glEnd();


    ///2nd hiding place
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.5, 0.3);//peach

	gl.glVertex2f(0.2, -0.1);
	gl.glVertex2f(0.17, -0.19);
    gl.glVertex2f(0.43, -0.19);
	gl.glVertex2f(0.4, -0.1);
	gl.glEnd();



	///grass1

    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 1.0, 0.0); // Green grass

    gl.glVertex2f(0.45, -0.21);
    gl.glVertex2f(0.475, -0.225);
    gl.glVertex2f(.48, -0.21);
    gl.glVertex2f(0.51, -0.21);
    gl.glVertex2f(0.50, -0.20);
    gl.glVertex2f(.55, -0.14);
    gl.glVertex2f(0.48, -0.20);
    gl.glVertex2f(0.52, -0.10);
    gl.glVertex2f(.47, -0.20);
    gl.glVertex2f(0.46, -0.10);
    gl.glVertex2f(0.45, -0.20);
    gl.glVertex2f(.41, -0.12);
    gl.glVertex2f(.44, -0.22);
    gl.glEnd();



    ///3rd hiding place
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.5, 0.3);//peach

	gl.glVertex2f(0.8, -0.06);
	gl.glVertex2f(0.78, -0.14);
    gl.glVertex2f(1.0, -0.14);
	gl.glVertex2f(1.0, -0.06);
	gl.glEnd();





	///Calling man going  function
        manGoing(gl);


    ///human2
    gl.glBegin(GL_QUADS);  // body
    gl.glColor3f(0.0, 1.0, 0.0);//peach

	gl.glVertex2f(-0.15, -0.16);
	gl.glVertex2f(-0.15, -0.08);
    gl.glVertex2f(-0.10, -0.08);
	gl.glVertex2f(-0.10, -0.16);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // gun
    gl.glColor3f(0.0, 0.0, 0.0);//purple

	gl.glVertex2f(-0.13, -0.09);
	gl.glVertex2f(-0.13, -0.12);
    gl.glVertex2f(-0.05, -0.15);
	gl.glVertex2f(-0.05, -0.17);
	gl.glEnd();

    gl.glBegin(GL_QUADS);  // handR
    gl.glColor3f(0.0, 0.0, 1.0);//purple

	gl.glVertex2f(-0.15, -0.08);
	gl.glVertex2f(-0.15, -0.12);
    gl.glVertex2f(-0.08, -0.15);
	gl.glVertex2f(-0.08, -0.15);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // handL
    gl.glColor3f(0.0, 0.0, 1.0);//purple

	gl.glVertex2f(-0.10, -0.08);
	gl.glVertex2f(-0.10, -0.12);
    gl.glVertex2f(-0.08, -0.15);
	gl.glVertex2f(-0.08, -0.15);
	gl.glEnd();
	//head
    var x61=-0.125; var y61=-0.07; var radius61=0.02;

      gl.glColor3f(0.5, 0.5, 0.5); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x61, y61); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x61 + (radius61 * Math.cos(i *  twicePi / triangleAmount)),

                        y61+ (radius61 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


	///human3
	gl.glBegin(GL_QUADS);  // body
    gl.glColor4f(0.0, 1.0, 0.0, 0.0);

	gl.glVertex2f(0.25, -0.10);
	gl.glVertex2f(0.30,  -0.10);
    gl.glVertex2f(0.30,  -0.02);
	gl.glVertex2f(0.25, -0.02);
	gl.glEnd();



	gl.glBegin(GL_QUADS);  // handR
    gl.glColor4f(0.0, 0.0, 1.0, 0.0);

	gl.glVertex2f(0.25, -0.02);
	gl.glVertex2f(0.25,  -0.06);
    gl.glVertex2f(0.23,  -0.10);
	gl.glVertex2f(0.22, -0.10);
	gl.glEnd();


	gl.glBegin(GL_QUADS);  // gun
    gl.glColor4f(0.0, 0.0, 0.0, 0.0);

	gl.glVertex2f(0.28, -0.02);
	gl.glVertex2f(0.28,  -0.06);
    gl.glVertex2f(0.20,  -0.11);
	gl.glVertex2f(0.20, -0.13);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // handL
    gl.glColor3f(0.0, 0.0, 1.0);

	gl.glVertex2f(0.30, -0.02);
	gl.glVertex2f(0.30,  -0.06);
    gl.glVertex2f(0.23,  -0.10);
	gl.glVertex2f(0.22, -0.10);
	gl.glEnd();

	//head
	 var x62=0.275; var y62=-0.01;var radius62=0.02;

    gl.glColor3f(0.5, 0.5, 0.5);

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x62, y62); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x62 + (radius62 * Math.cos(i *  twicePi / triangleAmount)),

                        y62+ (radius62 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


	///human4


	gl.glBegin(GL_QUADS);  // body
    gl.glColor3f(0.0, 1.0, 0.0);

	gl.glVertex2f(0.82, -0.06);
	gl.glVertex2f(0.87,  -0.06);
	gl.glVertex2f(0.87,  0.01);
	gl.glVertex2f(0.82, 0.01);
	gl.glEnd();



	gl.glBegin(GL_QUADS);  //handr
    gl.glColor3f(0.0, 0.0, 1.0);

	gl.glVertex2f(0.82, -0.00);
	gl.glVertex2f(0.82,  -0.04);
	gl.glVertex2f(0.79,  -0.06);
	gl.glVertex2f(0.79, -0.06);
	gl.glEnd();


	gl.glBegin(GL_QUADS);  //gun
    gl.glColor3f(0.0, 0.0, 0.0);

	gl.glVertex2f(0.85, -0.00);
	gl.glVertex2f(0.85,  -0.04);
	gl.glVertex2f(0.79,  -0.06);
	gl.glVertex2f(0.79, -0.08);
	gl.glEnd();





	gl.glBegin(GL_QUADS);  //handL

    gl.glColor3f(0.0, 0.0, 1.0);

	gl.glVertex2f(0.87, 0.01);
	gl.glVertex2f(0.87,  -0.03);
	gl.glVertex2f(0.82,  -0.05);
	gl.glVertex2f(0.82, -0.05);
	gl.glEnd();

	//head
    var x63=0.845; var y63=0.02; var radius63=0.02;

      gl.glColor3f(0.5, 0.5, 0.5); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x63, y63); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x63 + (radius63 * Math.cos(i *  twicePi / triangleAmount)),

                        y63+ (radius63 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

	/// human5
	gl.glBegin(GL_QUADS);  // gun
    gl.glColor3f(0.0, 0.0, 0.0);

	gl.glVertex2f(0.73, -0.07);
	gl.glVertex2f(0.73,  -0.07);
	gl.glVertex2f(0.77,  -0.04);
	gl.glVertex2f(0.77,  -0.06);
	gl.glEnd();


    gl.glBegin(GL_QUADS);  // body
    gl.glColor3f(0.0, 0.5, 1.0);

	gl.glVertex2f(0.68, -0.16);
	gl.glVertex2f(0.74,  -0.16);
	gl.glVertex2f(0.74, -0.06);
	gl.glVertex2f(0.68,  -0.06);

	gl.glEnd();

	 gl.glBegin(GL_QUADS);  // hhandr
    gl.glColor3f(0.0, 0.5, 1.0);

	gl.glVertex2f(0.68, -0.06);
	gl.glVertex2f(0.68,  -0.10);
	gl.glVertex2f(0.73, -0.07);
	gl.glVertex2f(0.73,  -0.07);

	gl.glEnd();




    gl.glBegin(GL_QUADS);  // hhandl
    gl.glColor3f(0.0, 0.5, 1.0);

	gl.glVertex2f(0.74, -0.06);
	gl.glVertex2f(0.74,  -0.10);
	gl.glVertex2f(0.76,  -0.07);
	gl.glVertex2f(0.76,  -0.07);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // leg1
    gl.glColor3f(0.0, 0.0, 0.0);

	gl.glVertex2f(0.68, -0.16);
	gl.glVertex2f(0.71,  -0.16);
	gl.glVertex2f(0.70,  -0.25);
	gl.glVertex2f(0.68,  -0.25);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // leg1
    gl.glColor3f(0.0, 0.0, 0.0);

	gl.glVertex2f(0.74, -0.16);
	gl.glVertex2f(0.71,  -0.16);
	gl.glVertex2f(0.72,  -0.25);
	gl.glVertex2f(0.74,  -0.25);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // longi
    gl.glColor3f(1.0, 0.0, 0.0);

	gl.glVertex2f(0.68, -0.16);
	gl.glVertex2f(0.74,  -0.16);
	gl.glVertex2f(0.74,  -0.20);
	gl.glVertex2f(0.68,  -0.20);
	gl.glEnd();

	//head
	var x64=0.71; var y64=-0.05; var radius64=0.02;

     gl.glColor3f(0.0, 0.0, 0.0);

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x64, y64); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x64 + (radius64 * Math.cos(i *  twicePi / triangleAmount)),

                        y64+ (radius64 * Math.sin(i * twicePi / triangleAmount)) );

		}
	gl.glEnd();


	///shoting man 1

	//humanleg
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glVertex2f(-0.23, -0.50);
	gl.glVertex2f(-0.25, -0.55);
    gl.glVertex2f(-0.26, -0.60);
	gl.glVertex2f(-0.28, -0.60);
    gl.glVertex2f(-0.26, -0.50);
    gl.glEnd();

    //humanleg2
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glVertex2f(-0.19, -0.50);
	gl.glVertex2f(-0.15, -0.60);
    gl.glVertex2f(-0.16, -0.60);
	gl.glVertex2f(-0.20, -0.55);
    gl.glVertex2f(-0.22, -0.50);
    gl.glEnd();


    //left arm
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.9, 0.7, 0.5);
	gl.glVertex2f(-0.26, -0.42);
	gl.glVertex2f(-0.16, -0.44);
    gl.glVertex2f(-0.16, -0.42);
	gl.glVertex2f(-0.26, -0.44);
    gl.glEnd();

    //gun
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glVertex2f(-0.19, -0.42);
	gl.glVertex2f(-0.14, -0.42);
    gl.glVertex2f(-0.14, -0.44);
	gl.glVertex2f(-0.19, -0.44);
    gl.glEnd();



    //right arm
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.9, 0.7, 0.5);
	gl.glVertex2f(-0.19, -0.41);
	gl.glVertex2f(-0.19, -0.43);
    gl.glVertex2f(-0.16, -0.42);
	gl.glVertex2f(-0.15, -0.44);
    gl.glEnd();



    //humanbody
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 0.0, 0.0);
	gl.glVertex2f(-0.26, -0.42);
	gl.glVertex2f(-0.26, -0.50);
    gl.glVertex2f(-0.19, -0.50);
	gl.glVertex2f(-0.19, -0.41);
    gl.glEnd();

    //humanneck
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glVertex2f(-0.21, -0.38);
	gl.glVertex2f(-0.24, -0.42);
    gl.glVertex2f(-0.21, -0.38);
	gl.glVertex2f(-0.24, -0.42);
    gl.glEnd();

    //bullet
    gl.glPushMatrix();
    gl.glTranslatef(position4,0.0, 0.0);
        var x35=-0.14; var y35=-0.43; var radius35 =-0.005;
        gl.glColor3f(0.0, 0.0, 0.0);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x35, y35); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x35 + (radius35 * Math.cos(i *  twicePi / triangleAmount)),
                            y35 + (radius35 * Math.sin(i * twicePi / triangleAmount)) );
            }

        gl.glEnd();
    gl.glPopMatrix();

    //head
        var x36=-0.22; var y36=-0.39; var radius36 =-0.02;
        gl.glColor3f(0.7, 0.4, 0.4);
        gl.glBegin(GL_TRIANGLE_FAN);
            gl.glVertex2f(x36, y36); // center of circle
            for(i = 0; i <= triangleAmount;i++) {
                gl.glVertex2f( x36 + (radius36 * Math.cos(i *  twicePi / triangleAmount)),
                            y36 + (radius36 * Math.sin(i * twicePi / triangleAmount)) );
            }
        gl.glEnd();

	///shotting man  2

    gl.glBegin(GL_QUADS);  // body
    gl.glColor3f(0., 1.0, 0.0);

	gl.glVertex2f(0.35, -0.30);
	gl.glVertex2f(0.42,  -0.30);
	gl.glVertex2f(0.42, -0.45);
	gl.glVertex2f(0.35,  -0.45);

	gl.glEnd();

	gl.glBegin(GL_QUADS);  // legr
    gl.glColor3f(0.0, 1.0, 0.0);

	gl.glVertex2f(0.35, -0.45);
	gl.glVertex2f(0.385,  -0.45);
	gl.glVertex2f(0.37,  -0.57);
	gl.glVertex2f(0.35,  -0.57);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // legl
    gl.glColor3f(0.0, 1.0, 0.0);

	gl.glVertex2f(0.42, -0.45);
	gl.glVertex2f(0.385,  -0.45);
	gl.glVertex2f(0.40,  -0.57);
	gl.glVertex2f(0.42,  -0.57);
	gl.glEnd();

     gl.glBegin(GL_QUADS);  // hhandr blood
    gl.glColor3f(0.0, 0.0, 1.0);

	gl.glVertex2f(0.33, -0.37);
	gl.glVertex2f(0.32,  -0.35);
	gl.glVertex2f(0.38,  -0.39);
	gl.glVertex2f(0.37,  -0.41);
	gl.glEnd();

	gl.glBegin(GL_QUADS);  // hhandr blood
    gl.glColor3f(0.0, 0.0, 1.0);

	gl.glVertex2f(0.35, -0.30);
	gl.glVertex2f(0.35,  -0.36);
	gl.glVertex2f(0.33,  -0.37);
	gl.glVertex2f(0.32,  -0.36);
	gl.glEnd();

    gl.glBegin(GL_QUADS);  // hhandl
    gl.glColor3f(0.0, 0.0, 1.0);

	gl.glVertex2f(0.42, -0.30);
	gl.glVertex2f(0.42,  -0.36);
	gl.glVertex2f(0.45,  -0.45);
	gl.glVertex2f(0.46,  -0.44);

	gl.glEnd();

	//head
	var x65=0.385; var y65=-0.28; var radius65=0.02;

     gl.glColor3f(0.5, 0.5, 0.5);

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x65, y65); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x65 + (radius65 * Math.cos(i *  twicePi / triangleAmount)),

                        y65+ (radius65 * Math.sin(i * twicePi / triangleAmount)) );

		}

      gl.glEnd();

      //blood
      var x100=0.38; var y100=-0.39; var radius100=0.009;

     gl.glColor3f(1.0, 0.0, 0.0);

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x100, y100); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x100 + (radius100 * Math.cos(i *  twicePi / triangleAmount)),

                        y100+ (radius100 * Math.sin(i * twicePi / triangleAmount)) );

		}

      gl.glEnd();


    ///human with flag

    // body
    gl.glBegin(GL_QUADS);
    gl.glColor3f(1.0, 1.0, 0.0);
	gl.glVertex2f(0.05, -0.20);
	gl.glVertex2f(0.10,  -0.20);
	gl.glVertex2f(0.10, -0.31);
	gl.glVertex2f(0.05,  -0.31);
	gl.glEnd();

	// legr
	gl.glBegin(GL_QUADS);
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glVertex2f(0.05, -0.31);
	gl.glVertex2f(0.075,  -0.31);
	gl.glVertex2f(0.06,  -0.39);
	gl.glVertex2f(0.05,  -0.39);
	gl.glEnd();

	// legs
    gl.glBegin(GL_QUADS);
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glVertex2f(0.10, -0.31);
	gl.glVertex2f(0.075,  -0.31);
	gl.glVertex2f(0.09,  -0.39);
	gl.glVertex2f(0.10,  -0.39);
	gl.glEnd();

	//handl
    gl.glBegin(GL_QUADS);
    gl.glColor3f(1.0, 1.0, 0.0);
	gl.glVertex2f(0.05, -0.20);
	gl.glVertex2f(0.05,  -0.25);
	gl.glVertex2f(0.02,  -0.33);
	gl.glVertex2f(0.01,  -0.33);
	gl.glEnd();

	//hand2
	gl.glBegin(GL_QUADS);
    gl.glColor3f(1.0, 1.0, 0.0);
	gl.glVertex2f(0.10, -0.20);
	gl.glVertex2f(0.10,  -0.24);
	gl.glVertex2f(0.13,  -0.28);
	gl.glVertex2f(0.15,  -0.28);
	gl.glEnd();

	gl.glBegin(GL_QUADS);
    gl.glColor3f(1.0, 1.0, 0.0);
	gl.glVertex2f(0.13, -0.28);
	gl.glVertex2f(0.15,  -0.28);
	gl.glVertex2f(0.14,  -0.20);
	gl.glVertex2f(0.13,  -0.20);
	gl.glEnd();

    //head
	var x66=0.075; var y66=-0.18; var radius66=0.02;
    gl.glColor3f(0.0, 0.0, 0.0);
	gl.glBegin(GL_TRIANGLE_FAN);
		gl.glVertex2f(x66, y66); // center of circle
		for(i = 0; i <= triangleAmount;i++) {
			gl.glVertex2f( x66 + (radius65 * Math.cos(i *  twicePi / triangleAmount)),
                        y66+ (radius65 * Math.sin(i * twicePi / triangleAmount)) );
		}
      gl.glEnd();

    //flag

    gl.glBegin(GL_QUADS);
    gl.glColor3f(0.0, 0.7, 0.0);
	gl.glVertex2f(0.12, -0.04);
	gl.glVertex2f(0.20,  -0.04);
	gl.glVertex2f(0.20,  -0.1);
	gl.glVertex2f(0.12,  -0.1);
	gl.glEnd();

	var x67=0.16; var y67=-0.07; var radius67=0.02;
    gl.glColor4f(1.0, 0.0, 0.0, 0.0);
	gl.glBegin(GL_TRIANGLE_FAN);
		gl.glVertex2f(x67, y67); // center of circle
		for(i = 0; i <= triangleAmount;i++) {
			gl.glVertex2f( x67 + (radius67 * Math.cos(i *  twicePi / triangleAmount)),
                        y67+ (radius67 * Math.sin(i * twicePi / triangleAmount)) );

		}
      gl.glEnd();

    //stike
    gl.glBegin(GL_LINES);
    gl.glVertex2f(0.13, -0.20);  // Start point of the line
    gl.glVertex2f(0.12, -0.1);    // End point of the line
    gl.glEnd();



	///******************************************Drawing Road***********************************///

	//Drawing White Stripe
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0); // White
	gl.glVertex2f(-1.0, -0.68);
	gl.glVertex2f(1.0, -0.58);
	gl.glVertex2f(1.0, -0.92);
	gl.glVertex2f(0.25, -1.0);
	gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();


	//Drawing Black Road
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0); //Black
	gl.glVertex2f(-1.0, -0.70);
	gl.glVertex2f(1.0, -0.60);
	gl.glVertex2f(1.0, -0.75);
	gl.glVertex2f(-1.0, -0.95);
	//gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();

	//Drawing Dark Gray Road
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-1.0, -0.96);
	gl.glVertex2f(1.0, -0.76);
	gl.glVertex2f(1.0, -0.90);
	gl.glVertex2f(0.06, -1.0);
	gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();


	///lamp post1///


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);
    gl.glVertex2f(-.96, -0.57);
    gl.glVertex2f(-0.93, -.57);
    gl.glVertex2f(-0.93, -.56);
    gl.glVertex2f(-.98, -0.56);
    gl.glVertex2f(-.98, -0.71);
    gl.glVertex2f(-.96, -0.71);
	gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.7, 0.7, 0.6);
    gl.glVertex2f(-.93, -0.56);
    gl.glVertex2f(-0.93, -.58);
    gl.glVertex2f(-0.88, -.58);
    gl.glVertex2f(-.88, -0.56);

	gl.glEnd();


    ///light2///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);
    gl.glVertex2f(-0.58, -.56);
    gl.glVertex2f(-.55, -0.56);
    gl.glVertex2f(-0.55, -.55);
    gl.glVertex2f(-.60, -0.55);
    gl.glVertex2f(-.60, -0.70);
    gl.glVertex2f(-0.58, -.70);
	gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.7, 0.7, 0.6);
    gl.glVertex2f(-0.55, -.55);
    gl.glVertex2f(-.55, -0.57);
    gl.glVertex2f(-0.50, -.57);
    gl.glVertex2f(-.50, -0.55);
	gl.glEnd();

    ///light3///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(-0.18, -.54);
    gl.glVertex2f(-.15, -0.54);
    gl.glVertex2f(-0.15, -.53);
    gl.glVertex2f(-.20, -0.53);
    gl.glVertex2f(-0.20, -.67);
    gl.glVertex2f(-0.18, -.67);
    gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.7, 0.7, 0.6);
    gl.glVertex2f(-0.15, -.53);
    gl.glVertex2f(-.15, -0.55);
    gl.glVertex2f(-0.10, -.55);
    gl.glVertex2f(-.10, -0.53);
	gl.glEnd();

    ///light4///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(0.17, -.53);
    gl.glVertex2f(.20, -0.53);
    gl.glVertex2f(0.20, -.52);
    gl.glVertex2f(.15, -0.52);
    gl.glVertex2f(0.15, -.65);
    gl.glVertex2f(0.17, -.65);
    gl.glEnd();



    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.7, 0.7, 0.6);
    gl.glVertex2f(0.20, -.54);
    gl.glVertex2f(.25, -0.54);
    gl.glVertex2f(0.25, -.52);
    gl.glVertex2f(.20, -0.52);
    gl.glEnd();

    ///light5///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(0.52, -.51);
    gl.glVertex2f(.55, -0.51);
    gl.glVertex2f(0.55, -.50);
    gl.glVertex2f(.50, -0.50);
    gl.glVertex2f(0.50, -.62);
    gl.glVertex2f(0.52, -.62);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.7, 0.7, 0.6);
    gl.glVertex2f(0.55, -.52);
    gl.glVertex2f(.60, -0.52);
    gl.glVertex2f(0.60, -.50);
    gl.glVertex2f(.55, -0.50);
    gl.glEnd();

    ///light6///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(0.87, -.50);
    gl.glVertex2f(.90, -0.50);
    gl.glVertex2f(0.90, -.49);
    gl.glVertex2f(.85, -0.49);
    gl.glVertex2f(0.85, -.60);
    gl.glVertex2f(0.87, -.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.7, 0.7, 0.6);
    gl.glVertex2f(0.90, -.51);
    gl.glVertex2f(.95, -0.51);
    gl.glVertex2f(0.95, -.49);
    gl.glVertex2f(.90, -0.49);
    gl.glEnd();

	///calling tank function
	car(gl);


	gl.glFlush();  // Render now



}






 function displayNight_view(gl){

    gl.glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    ///*******************************************Drawing river***********************************///
    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient14 = [0.6, 0.8, 1.0, 1.0];//ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient14);

    gl.glBegin(GL_QUADS);  // These vertices form a closed polygon
	gl.glColor3f(0.6, 1.0, 1.0); // Light Sky
	gl.glVertex2f(-1.0, -0.20);
	gl.glVertex2f(1.0, 0.0);
	gl.glVertex2f(1.0, 0.48);
	gl.glVertex2f(-1.0, 0.45);
	gl.glEnd();

	gl.glDisable(GL_LIGHTING);

	///*******************************************Drawing Sky***********************************///
	 gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient = [0.0, 0.0, 0.2, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient);

	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
	gl.glColor3f(0.6, 1.0, 1.0); // Light Sky
	gl.glVertex2f(-1.0, 1.0);
	gl.glVertex2f(1.0, 1.0);
	gl.glVertex2f(1.0, 0.60);
	gl.glVertex2f(-1.0, 0.60);
	gl.glEnd();
    gl.glDisable(GL_LIGHTING);


    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient3 = [1.0, 1.0, 1.0, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient3);


        ///calling cloud1

        cloud1(gl);

        ///cloud2 calling
        cloud2(gl);
        gl.glDisable(GL_LIGHTING);

    ///**********************************************Drawing Moon****************************************///
    //circle1

    var x_1=-0.85; var y_1=0.85; var radius_1 =0.10;

	gl.glColor3f(1.0, 1.0, 1.0);
	gl.glBegin(GL_TRIANGLE_FAN);
		gl.glVertex2f(x_1, y_1); // center of circle
		for(i = 0; i <= triangleAmount;i++) {
			gl.glVertex2f( x_1 + (radius_1 * Math.cos(i *  twicePi / triangleAmount)),
                        y_1 + (radius_1 * Math.sin(i * twicePi / triangleAmount)) );
		}
	gl.glEnd();


	//circle2


    var x_2=-0.80; var y_2=0.89; var radius_2 =0.10;

	gl.glColor3f(0.0, 0.0, 0.0);
	gl.glBegin(GL_TRIANGLE_FAN);
		gl.glVertex2f(x_2, y_2); // center of circle
		for(i = 0; i <= triangleAmount;i++) {
			gl.glVertex2f( x_2 + (radius_2 * Math.cos(i *  twicePi / triangleAmount)),
                        y_2 + (radius_2 * Math.sin(i * twicePi / triangleAmount)) );
		}
	gl.glEnd();

        ///calling stars
        stars(gl);


	///**********************************************Drawing Hill****************************************///


    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient2 = [0.5, 0.5, 0.5, 1.0];//ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient2);


    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 1
    gl.glVertex2f(-1.0, 0.68);
    gl.glVertex2f(-0.89, 0.80);
    gl.glVertex2f(-0.60, 0.60);
    gl.glVertex2f(-1.00, 0.60);
    gl.glEnd();


    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green for the hill 2
    gl.glVertex2f(-.84, 0.60);
    gl.glVertex2f(-0.61, 0.79);
    gl.glVertex2f(-0.30, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 3
    gl.glVertex2f(-.60, 0.60);
    gl.glVertex2f(-0.37, 0.75);
    gl.glVertex2f(-0.18, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green for the hill 4
    gl.glVertex2f(-.34, 0.60);
    gl.glVertex2f(-0.13, 0.80);
    gl.glVertex2f(0.12, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 5
    gl.glVertex2f(0.05, 0.60);
    gl.glVertex2f(0.20, 0.74);
    gl.glVertex2f(0.39, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 1.0, 0.0); // Green for the hill 6
    gl.glVertex2f(0.39, 0.60);
    gl.glVertex2f(0.62, 0.79);
    gl.glVertex2f(0.92, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Deep Green for the hill 7
    gl.glVertex2f(0.20, 0.60);
    gl.glVertex2f(0.42, 0.81);
    gl.glVertex2f(0.68, 0.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.0, 0.7, 0.0); // Green for the hill 8
    gl.glVertex2f(0.73, 0.60);
    gl.glVertex2f(1.00, 0.60);
    gl.glVertex2f(0.94, 0.68);
    gl.glEnd();

    gl.glDisable(GL_LIGHTING);

    ///river opposite view///
    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient10 = [0.0, 0.2, 0.0, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient10);

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.2,0.4, 0.0);
    gl.glVertex2f(-1.00, 0.60);
    gl.glVertex2f(-1.00, 0.45);
    gl.glVertex2f(1.00, 0.48);
    gl.glVertex2f(1.00, 0.60);
    gl.glEnd();
    gl.glDisable(GL_LIGHTING);

     gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient11 = [0.4, 0.2, 0.0, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient11);

    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.5, 0.4, 0.0);
    gl.glVertex2f(-1.00, 0.50);
    gl.glVertex2f(-1.00, 0.45);
    gl.glVertex2f(1.00, 0.48);
    gl.glVertex2f(1.00, 0.52);
    gl.glEnd();
    gl.glDisable(GL_LIGHTING);

///river tree///


    gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.5, 0.4, 0.0);
    gl.glVertex2f(-.95, 0.55);
    gl.glVertex2f(-.93, 0.55);
    gl.glVertex2f(-.93, 0.50);
    gl.glVertex2f(-.95, 0.50);
    gl.glEnd();

    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient13 = [0.0, 0.5, 0.0, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient13);

    var x71=-0.94; var y71=0.57;var radius71 =0.04;


    gl.glColor3f(0.2, .8, 0.3); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x71, y71); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x71 + (radius71 * Math.cos(i *  twicePi / triangleAmount)),

                        y71+ (radius71 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


    var x70=-0.94; var y70=0.56;var radius70 =0.025;


    gl.glColor3f(0.2, .5, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x70, y70); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x70 + (radius70 * Math.cos(i *  twicePi / triangleAmount)),
                        y70+ (radius70 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();
	gl.glDisable(GL_LIGHTING);

	///***************************************Ship-1 Drawing*****************************///
    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//red-base of the ship-1

    gl.glVertex2f(0.20,0.0);

    gl.glVertex2f(0.18,0.03);

    gl.glVertex2f(0.42,0.03);

    gl.glVertex2f(0.40,0.0);

    gl.glEnd();


     gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//black-base of the ship-1

    gl.glVertex2f(0.18,0.03);

    gl.glVertex2f(0.13,0.10);

    gl.glVertex2f(0.14,0.12);

    gl.glVertex2f(0.45,0.12);

    gl.glVertex2f(0.46,0.08);

    gl.glVertex2f(0.42,0.03);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//red-window of the ship-1

    gl.glVertex2f(0.18,0.07);

    gl.glVertex2f(0.18,0.09);

    gl.glVertex2f(0.24,0.09);

    gl.glVertex2f(0.24,0.07);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//red-window of the ship-1

    gl.glVertex2f(0.26,0.07);

    gl.glVertex2f(0.26,0.09);

    gl.glVertex2f(0.32,0.09);

    gl.glVertex2f(0.32,0.07);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//red-window of the ship-1

    gl.glVertex2f(0.34,0.07);

    gl.glVertex2f(0.34,0.09);

    gl.glVertex2f(0.40,0.09);

    gl.glVertex2f(0.40,0.07);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 1.0, 1.0);//house-1 of the ship-1

    gl.glVertex2f(0.28,0.12);

    gl.glVertex2f(0.28,0.22);

    gl.glVertex2f(0.36,0.22);

    gl.glVertex2f(0.36,0.12);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 1.0, 1.0);//house-2 of the ship-1

    gl.glVertex2f(0.32,0.17);

    gl.glVertex2f(0.32,0.30);

    gl.glVertex2f(0.40,0.30);

    gl.glVertex2f(0.40,0.17);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//shed of house-1 of the ship-1

    gl.glVertex2f(0.27,0.22);

    gl.glVertex2f(0.27,0.23);

    gl.glVertex2f(0.37,0.23);

    gl.glVertex2f(0.37,0.22);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//shed of house-2 of the ship-1

    gl.glVertex2f(0.31,0.30);

    gl.glVertex2f(0.31,0.31);

    gl.glVertex2f(0.41,0.31);

    gl.glVertex2f(0.41,0.30);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//bottom of house-2 of the ship-1

    gl.glVertex2f(0.36,0.12);

    gl.glVertex2f(0.36,0.17);

    gl.glVertex2f(0.40,0.17);

    gl.glVertex2f(0.40,0.12);

    gl.glEnd();


    gl.glBegin(GL_LINES);

    gl.glColor3f(0.0, 0.0, 0.0);

    gl.glVertex2f(0.28,0.12);

    gl.glVertex2f(0.28,0.22);

    gl.glEnd();


    gl.glBegin(GL_LINES);

    gl.glColor3f(0.0, 0.0, 0.0);

    gl.glVertex2f(0.36,0.12);

    gl.glVertex2f(0.36,0.22);

    gl.glEnd();


     gl.glBegin(GL_LINES);

    gl.glColor3f(0.0, 0.0, 0.0);

    gl.glVertex2f(0.32,0.23);

    gl.glVertex2f(0.32,0.30);

    gl.glEnd();


    gl.glBegin(GL_LINES);

    gl.glColor3f(0.0, 0.0, 0.0);

    gl.glVertex2f(0.40,0.17);

    gl.glVertex2f(0.40,0.30);

    gl.glEnd();


      gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window of house-1 of the ship-1

    gl.glVertex2f(0.29,0.17);

    gl.glVertex2f(0.29,0.19);

    gl.glVertex2f(0.32,0.19);

    gl.glVertex2f(0.32,0.17);

    gl.glEnd();


      gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window of house-1 of the ship-1

    gl.glVertex2f(0.325,0.17);

    gl.glVertex2f(0.325,0.19);

    gl.glVertex2f(0.355,0.19);

    gl.glVertex2f(0.355,0.17);

    gl.glEnd();


      gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window of house-2 of the ship-1

    gl.glVertex2f(0.33,0.26);

    gl.glVertex2f(0.33,0.28);

    gl.glVertex2f(0.36,0.28);

    gl.glVertex2f(0.36,0.26);

    gl.glEnd();


     gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window of house-2 of the ship-1

    gl.glVertex2f(0.365,0.26);

    gl.glVertex2f(0.365,0.28);

    gl.glVertex2f(0.395,0.28);

    gl.glVertex2f(0.395,0.26);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 1.0, 1.0);//antenna

    gl.glVertex2f(0.20,0.12);

    gl.glVertex2f(0.20,0.42);

    gl.glVertex2f(0.202,0.42);

    gl.glVertex2f(0.202,0.12);

    gl.glEnd();


    gl.glBegin(GL_LINES);

    gl.glColor3f(1.0, 1.0, 1.0);//antenna

    gl.glVertex2f(0.16,0.24);

    gl.glVertex2f(0.24,0.24);

    gl.glEnd();


    gl.glBegin(GL_LINES);

    gl.glColor3f(1.0, 1.0, 1.0);//antenna

    gl.glVertex2f(0.17,0.28);

    gl.glVertex2f(0.23,0.28);

    gl.glEnd();


    gl.glBegin(GL_LINES);

    gl.glColor3f(1.0, 1.0, 1.0);//antenna

    gl.glVertex2f(0.18,0.32);

    gl.glVertex2f(0.22,0.32);

    gl.glEnd();


     gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//khuti

    gl.glVertex2f(0.15,0.12);
    gl.glVertex2f(0.15,0.13);
    gl.glVertex2f(0.16,0.13);
    gl.glVertex2f(0.16,0.12);

    gl.glEnd();

    ///***************************************Drawing Speed Boat*****************************///


     gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//base of speed boat

    gl.glVertex2f(-0.10,-0.05);

    gl.glVertex2f(-0.12,0.0);

    gl.glVertex2f(0.08,0.02);

    gl.glVertex2f(0.05,-0.05);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 1.0, 1.0);//base of speed boat

    gl.glVertex2f(-0.08,0.005);

    gl.glVertex2f(-0.08,0.07);

    gl.glVertex2f(0.02,0.07);

    gl.glVertex2f(0.04,0.015);

    gl.glEnd();


     gl.glBegin(GL_POLYGON);

    gl.glColor3f(1.0, 0.0, 0.0);//hood of speed boat

    gl.glVertex2f(-0.09,0.07);

    gl.glVertex2f(-0.09,0.08);

    gl.glVertex2f(0.03,0.08);

    gl.glVertex2f(0.03,0.07);

    gl.glEnd();


     gl.glBegin(GL_LINE_LOOP);

    gl.glColor3f(0.0, 0.0, 0.0);

    gl.glVertex2f(-0.08,0.005);

    gl.glVertex2f(-0.08,0.07);

    gl.glVertex2f(0.02,0.07);

    gl.glVertex2f(0.04,0.015);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window

    gl.glVertex2f(-0.07,0.03);

    gl.glVertex2f(-0.07,0.05);

    gl.glVertex2f(-0.05,0.05);

    gl.glVertex2f(-0.05,0.03);

    gl.glEnd();


    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window

    gl.glVertex2f(-0.04,0.03);

    gl.glVertex2f(-0.04,0.05);

    gl.glVertex2f(-0.02,0.05);

    gl.glVertex2f(-0.02,0.03);

    gl.glEnd();


       gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 0.0, 0.0);//window

    gl.glVertex2f(-0.01,0.03);

    gl.glVertex2f(-0.01,0.05);

    gl.glVertex2f(0.01,0.05);

    gl.glVertex2f(0.01,0.03);

    gl.glEnd();


	///***************************************Drawing Grassy Ground*****************************///
	gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient6 = [0.0, 0.2, 0.0, 1.0];//ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient6);

	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.7, 0.3); //Green
	gl.glVertex2f(-1.0, -0.20);
	gl.glVertex2f(1.0, 0.00);
	gl.glVertex2f(1.0, -1.0);
	gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();

	gl.glDisable(GL_LIGHTING);

	///Drawing House

	gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient7 = [1.0, 1.0, 0.0, 1.0];//ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient7);

	//Drawing Overall Shape
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.8, 0.3);//Hay Yellow
	gl.glVertex2f(-0.90, -0.15);
	gl.glVertex2f(-0.65, -0.15);
	gl.glVertex2f(-0.59, -0.24);
	gl.glVertex2f(-0.60, -0.24);
	gl.glVertex2f(-0.60, -0.37);
    gl.glVertex2f(-0.72, -0.40);
    gl.glVertex2f(-0.95, -0.40);
	gl.glVertex2f(-0.95, -0.24);
	gl.glVertex2f(-0.98, -0.24);
	gl.glEnd();


	//drawing roof
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.6, 0.6, 0.1);
    gl.glVertex2f(-0.73, -0.24);
    gl.glVertex2f(-0.65, -0.15);
    gl.glVertex2f(-0.59, -0.24);
	gl.glEnd();

	//drawing Door Side
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.6, 0.6, 0.5);//Ash
	gl.glVertex2f(-0.72, -.38);
	gl.glVertex2f(-0.72, -.24);
	gl.glVertex2f(-0.60, -.24);
	gl.glVertex2f(-0.60, -.36);
	gl.glEnd();

	//drawing Front Side
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 0.8);//Off White
    gl.glVertex2f(-0.95, -0.24);
    gl.glVertex2f(-0.72, -0.24);
    gl.glVertex2f(-0.72, -0.38);
    gl.glVertex2f(-0.95, -0.38);
	gl.glEnd();
	//drawing Border
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.5, 0.5, 0.5);//grey
    gl.glVertex2f(-0.72, -0.40);
    gl.glVertex2f(-0.97, -0.40);
	gl.glVertex2f(-0.97, -0.38);
	gl.glVertex2f(-0.72, -0.38);
	gl.glEnd();

	//drawing Border
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0); //Black
	gl.glVertex2f(-0.72, -0.38);
	gl.glVertex2f(-0.58, -0.35);
    gl.glVertex2f(-0.58, -0.37);
	gl.glVertex2f(-0.72, -0.40);
	gl.glEnd();
	gl.glDisable(GL_LIGHTING);

    //Drawing Window 1
    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient8 = [1.0, 0.5, 0.0, 1.0];   //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient8);


	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-0.92, -.28);
	gl.glVertex2f(-0.92, -.33);
	gl.glVertex2f(-0.87, -.33);
	gl.glVertex2f(-0.87, -.28);
	gl.glEnd();

	//Drawing Window 2
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-0.80, -.28);
	gl.glVertex2f(-0.80, -.33);
	gl.glVertex2f(-0.75, -.33);
	gl.glVertex2f(-0.75, -.28);
	gl.glEnd();

	//Drawing Door
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-0.68, -.28);
	gl.glVertex2f(-0.68, -.37);
	gl.glVertex2f(-0.64, -.37);
	gl.glVertex2f(-0.64, -.28);
	gl.glEnd();
    gl.glDisable(GL_LIGHTING);


	///Drawing Tree

	//Drawing Log Shape
	gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient4 = [0.4, 0.2, 0.0, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient4);

	gl.glBegin(GL_POLYGON);
    gl.glColor3f(0.4, 0.3, 0.1); // Light chocolate

	gl.glVertex2f(-0.43, -0.30);
	gl.glVertex2f(-0.46, -0.37);
	gl.glVertex2f(-0.46, -0.31);
	gl.glVertex2f(-0.55, -0.35);
	gl.glVertex2f(-0.49, -0.30);
	gl.glVertex2f(-0.47, -0.26);
	gl.glVertex2f(-0.46, -0.20);
	gl.glVertex2f(-0.48, -0.10);
	gl.glVertex2f(-0.50, -0.05);
	gl.glVertex2f(-0.46, -0.09);
	gl.glVertex2f(-0.46, -0.05);
	gl.glVertex2f(-0.44, -0.05);
	gl.glVertex2f(-0.43, -0.09);
	gl.glVertex2f(-0.40, -0.05);
	gl.glVertex2f(-0.38, -0.05);
	gl.glVertex2f(-0.39, -0.10);
	gl.glVertex2f(-0.39, -0.15);
	gl.glVertex2f(-0.38, -0.20);
	gl.glVertex2f(-0.38, -0.26);
	gl.glVertex2f(-0.37, -0.30);
	gl.glVertex2f(-0.32, -0.35);
	gl.glVertex2f(-0.39, -0.31);
	gl.glVertex2f(-0.38, -0.37);

	gl.glEnd();

    gl.glDisable(GL_LIGHTING);

	///Drawing tree leaf
    //circle 7 middle
    gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient5 = [0.0, 0.5, 0.0, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient5);


    var x27=-0.44; var y27=0.14;

    gl.glColor3f(0.0, 0.4, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x27, y27); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x27 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y27+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

	//circle 1

    var x20=-0.62; var y20=0.10;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x20, y20); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x20 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y20+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

    //circle 2

    var x21=-0.51; var y21=0.23;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x21, y21); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x21 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y21+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

    //circle 3

    var x22=-0.36; var y22=0.2;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x22, y22); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x22 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y22+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();


	//circle 4

    var x24=-0.24; var y24=0.11;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x24, y24); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x24 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y24+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

	//circle 5

    var x25=-0.36; var y25=0.01;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x25, y25); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x25 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y25+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();

    //circle 6

    var x26=-0.53; var y26=0.02;

    gl.glColor3f(0.0, 1.0, 0.0); //Green

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x26, y26); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x26 + (radius9 * Math.cos(i *  twicePi / triangleAmount)),

                        y26+ (radius9 * Math.sin(i * twicePi / triangleAmount)) );

		}

	gl.glEnd();
    gl.glDisable(GL_LIGHTING);


	///hiding place 1
	gl.glEnable(GL_LIGHTING);//Enable Light Effect
    var global_ambient9 = [1.0, 0.8, 0.6, 1.0]; //ambient RGBA intensity of light
    gl.glLightModelfv(GL_LIGHT_MODEL_AMBIENT, global_ambient9);




	//hiding place
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.5, 0.3);//peach

	gl.glVertex2f(-0.25, -0.16);
	gl.glVertex2f(-0.28, -0.25);
    gl.glVertex2f(-0.02, -0.25);
	gl.glVertex2f(-0.05, -0.16);
	gl.glEnd();


    ///2nd hiding place
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.5, 0.3);//peach

	gl.glVertex2f(0.2, -0.1);
	gl.glVertex2f(0.17, -0.19);
    gl.glVertex2f(0.43, -0.19);
	gl.glVertex2f(0.4, -0.1);
	gl.glEnd();





	///grass
    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 1.0, 0.0); // Green grass

    gl.glVertex2f(0.45, -0.21);
    gl.glVertex2f(0.475, -0.225);
    gl.glVertex2f(.48, -0.21);
    gl.glVertex2f(0.51, -0.21);
    gl.glVertex2f(0.50, -0.20);
    gl.glVertex2f(.55, -0.14);
    gl.glVertex2f(0.48, -0.20);
    gl.glVertex2f(0.52, -0.10);
    gl.glVertex2f(.47, -0.20);
    gl.glVertex2f(0.46, -0.10);
    gl.glVertex2f(0.45, -0.20);
    gl.glVertex2f(.41, -0.12);
    gl.glVertex2f(.44, -0.22);
    gl.glEnd();

    ///grass2
    gl.glBegin(GL_POLYGON);

    gl.glColor3f(0.0, 1.0, 0.0); // Green grass

    gl.glVertex2f(-0.05, -0.21);
    gl.glVertex2f(-0.035, -0.225);
    gl.glVertex2f(0.03, -0.21);
    gl.glVertex2f(0.01, -0.21);
    gl.glVertex2f(0.00, -0.20);
    gl.glVertex2f(0.05, -0.14);
    gl.glVertex2f(-0.02, -0.20);
    gl.glVertex2f(0.02, -0.10);
    gl.glVertex2f(-0.03, -0.20);
    gl.glVertex2f(-0.04, -0.10);
    gl.glVertex2f(-0.05, -0.20);
    gl.glVertex2f(-0.09, -0.12);
    gl.glVertex2f(-0.06, -0.22);
    gl.glEnd();


    ///3rd hiding place
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.8, 0.5, 0.3);//peach

	gl.glVertex2f(0.8, -0.06);
	gl.glVertex2f(0.78, -0.14);
    gl.glVertex2f(1.0, -0.14);
	gl.glVertex2f(1.0, -0.06);
	gl.glEnd();

	 gl.glDisable(GL_LIGHTING);



   //human blood



	//blood
	var x64=-0.10; var y64=-0.35; var radius64=0.02;

     gl.glColor3f(1.0, 0.0, 0.0);

	gl.glBegin(GL_TRIANGLE_FAN);

		gl.glVertex2f(x64, y64); // center of circle

		for(i = 0; i <= triangleAmount;i++) {

			gl.glVertex2f( x64 + (radius64 * Math.cos(i *  twicePi / triangleAmount)),

                        y64+ (radius64 * Math.sin(i * twicePi / triangleAmount)) );

		}
	gl.glEnd();

 gl.glDisable(GL_LIGHTING);
	///******************************************Drawing Road***********************************///

	//Drawing White Stripe
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0); // White
	gl.glVertex2f(-1.0, -0.68);
	gl.glVertex2f(1.0, -0.58);
	gl.glVertex2f(1.0, -0.92);
	gl.glVertex2f(0.25, -1.0);
	gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();


	//Drawing Black Road
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.0, 0.0, 0.0); //Black
	gl.glVertex2f(-1.0, -0.70);
	gl.glVertex2f(1.0, -0.60);
	gl.glVertex2f(1.0, -0.75);
	gl.glVertex2f(-1.0, -0.95);
	//gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();

	//Drawing Dark Gray Road
	gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
	gl.glVertex2f(-1.0, -0.96);
	gl.glVertex2f(1.0, -0.76);
	gl.glVertex2f(1.0, -0.90);
	gl.glVertex2f(0.06, -1.0);
	gl.glVertex2f(-1.0, -1.0);
	gl.glEnd();


	///lamp post1///


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(-.96, -0.57);
    gl.glVertex2f(-0.93, -.57);
    gl.glVertex2f(-0.93, -.56);
    gl.glVertex2f(-.98, -0.56);
    gl.glVertex2f(-.98, -0.71);
    gl.glVertex2f(-.96, -0.71);
	gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0);//Dark grey
    gl.glVertex2f(-.93, -0.56);
    gl.glVertex2f(-0.93, -.58);
    gl.glVertex2f(-0.88, -.58);
    gl.glVertex2f(-.88, -0.56);

	gl.glEnd();


    ///light2///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(-0.58, -.56);
    gl.glVertex2f(-.55, -0.56);
    gl.glVertex2f(-0.55, -.55);
    gl.glVertex2f(-.60, -0.55);
    gl.glVertex2f(-.60, -0.70);
    gl.glVertex2f(-0.58, -.70);
	gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0);//Dark grey
    gl.glVertex2f(-0.55, -.55);
    gl.glVertex2f(-.55, -0.57);
    gl.glVertex2f(-0.50, -.57);
    gl.glVertex2f(-.50, -0.55);
	gl.glEnd();

    ///light3///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(-0.18, -.54);
    gl.glVertex2f(-.15, -0.54);
    gl.glVertex2f(-0.15, -.53);
    gl.glVertex2f(-.20, -0.53);
    gl.glVertex2f(-0.20, -.67);
    gl.glVertex2f(-0.18, -.67);
    gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0);//Dark grey
    gl.glVertex2f(-0.15, -.53);
    gl.glVertex2f(-.15, -0.55);
    gl.glVertex2f(-0.10, -.55);
    gl.glVertex2f(-.10, -0.53);
	gl.glEnd();

    ///light4///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(0.17, -.53);
    gl.glVertex2f(.20, -0.53);
    gl.glVertex2f(0.20, -.52);
    gl.glVertex2f(.15, -0.52);
    gl.glVertex2f(0.15, -.65);
    gl.glVertex2f(0.17, -.65);
    gl.glEnd();


    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0);//Dark grey
    gl.glVertex2f(0.20, -.54);
    gl.glVertex2f(.25, -0.54);
    gl.glVertex2f(0.25, -.52);
    gl.glVertex2f(.20, -0.52);
    gl.glEnd();

    ///light5///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(0.52, -.51);
    gl.glVertex2f(.55, -0.51);
    gl.glVertex2f(0.55, -.50);
    gl.glVertex2f(.50, -0.50);
    gl.glVertex2f(0.50, -.62);
    gl.glVertex2f(0.52, -.62);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0);//Dark grey
    gl.glVertex2f(0.55, -.52);
    gl.glVertex2f(.60, -0.52);
    gl.glVertex2f(0.60, -.50);
    gl.glVertex2f(.55, -0.50);
    gl.glEnd();

    ///light6///
    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(0.1, 0.1, 0.1);//Dark grey
    gl.glVertex2f(0.87, -.50);
    gl.glVertex2f(.90, -0.50);
    gl.glVertex2f(0.90, -.49);
    gl.glVertex2f(.85, -0.49);
    gl.glVertex2f(0.85, -.60);
    gl.glVertex2f(0.87, -.60);
    gl.glEnd();

    gl.glBegin(GL_POLYGON);  // These vertices form a closed polygon
    gl.glColor3f(1.0, 1.0, 1.0);//Dark grey
    gl.glVertex2f(0.90, -.51);
    gl.glVertex2f(.95, -0.51);
    gl.glVertex2f(0.95, -.49);
    gl.glVertex2f(.90, -0.49);
    gl.glEnd();

	///calling car function
	car(gl);



	gl.glFlush();  // Render now

}





/**
 * GL2Canvas: Pure HTML5 Canvas 2D Emulation of OpenGL 1.1 / GLUT Fixed-Function Pipeline
 * Designed specifically to execute Shakil Jamil Mrida's 3,400-line C++ OpenGL source code
 * with 1:1 pixel accuracy for the 1971 Liberation War simulation.
 */
class GL2Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.clearColor = 'rgb(0, 255, 255)';
    this.rawColor = [1.0, 1.0, 1.0, 1.0];
    this.currentMode = null;
    this.currentVertices = [];
    this.lightingEnabled = false;
    this.currentAmbient = [1.0, 1.0, 1.0, 1.0];
  }

  toX(glX) {
    return (glX + 1.0) * 0.5 * this.width;
  }

  toY(glY) {
    return (1.0 - glY) * 0.5 * this.height;
  }

  glClearColor(r, g, b, a) {
    this.clearColor = `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a !== undefined ? a : 1})`;
  }

  glClear(mask) {
    this.ctx.fillStyle = this.clearColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  glColor3f(r, g, b) {
    this.rawColor = [r, g, b, 1.0];
  }

  glColor4f(r, g, b, a) {
    this.rawColor = [r, g, b, a];
  }

  glColor3ub(r, g, b) {
    this.rawColor = [r / 255.0, g / 255.0, b / 255.0, 1.0];
  }

  glEnable(cap) {
    if (cap === 'GL_LIGHTING') this.lightingEnabled = true;
  }

  glDisable(cap) {
    if (cap === 'GL_LIGHTING') this.lightingEnabled = false;
  }

  glLightModelfv(pname, params) {
    if (pname === 'GL_LIGHT_MODEL_AMBIENT') {
      this.currentAmbient = params;
    }
  }

  glShadeModel(model) {}

  getEffectiveColor() {
    let [r, g, b, a] = this.rawColor;
    if (this.lightingEnabled && this.currentAmbient) {
      r *= this.currentAmbient[0];
      g *= this.currentAmbient[1];
      b *= this.currentAmbient[2];
    }
    const ir = Math.min(255, Math.max(0, Math.round(r * 255)));
    const ig = Math.min(255, Math.max(0, Math.round(g * 255)));
    const ib = Math.min(255, Math.max(0, Math.round(b * 255)));
    return `rgba(${ir}, ${ig}, ${ib}, ${a !== undefined ? a : 1})`;
  }

  glPushMatrix() {
    this.ctx.save();
  }

  glPopMatrix() {
    this.ctx.restore();
  }

  glTranslatef(dx, dy, dz) {
    const pixelDx = dx * 0.5 * this.width;
    const pixelDy = -dy * 0.5 * this.height;
    this.ctx.translate(pixelDx, pixelDy);
  }

  glPointSize(sz) {}

  glBegin(mode) {
    this.currentMode = mode;
    this.currentVertices = [];
  }

  glVertex2f(x, y) {
    this.currentVertices.push({ x: this.toX(x), y: this.toY(y) });
  }

  glEnd() {
    const v = this.currentVertices;
    if (!v || v.length === 0) return;

    const color = this.getEffectiveColor();

    if (this.currentMode === 'GL_POLYGON' || this.currentMode === 'GL_QUADS') {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      this.ctx.moveTo(v[0].x, v[0].y);
      for (let i = 1; i < v.length; i++) {
        this.ctx.lineTo(v[i].x, v[i].y);
      }
      this.ctx.closePath();
      this.ctx.fill();
    } else if (this.currentMode === 'GL_TRIANGLE_FAN') {
      this.ctx.beginPath();
      this.ctx.fillStyle = color;
      if (v.length > 2) {
        this.ctx.moveTo(v[1].x, v[1].y);
        for (let i = 2; i < v.length; i++) {
          this.ctx.lineTo(v[i].x, v[i].y);
        }
      } else if (v.length > 0) {
        this.ctx.moveTo(v[0].x, v[0].y);
        for (let i = 1; i < v.length; i++) {
          this.ctx.lineTo(v[i].x, v[i].y);
        }
      }
      this.ctx.closePath();
      this.ctx.fill();
    } else if (this.currentMode === 'GL_LINES') {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2.5;
      for (let i = 0; i < v.length; i += 2) {
        if (i + 1 < v.length) {
          this.ctx.moveTo(v[i].x, v[i].y);
          this.ctx.lineTo(v[i+1].x, v[i+1].y);
        }
      }
      this.ctx.stroke();
    } else if (this.currentMode === 'GL_LINE_LOOP') {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2.5;
      this.ctx.moveTo(v[0].x, v[0].y);
      for (let i = 1; i < v.length; i++) {
        this.ctx.lineTo(v[i].x, v[i].y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    } else if (this.currentMode === 'GL_POINTS') {
      this.ctx.fillStyle = color;
      for (let i = 0; i < v.length; i++) {
        this.ctx.fillRect(v[i].x - 1.5, v[i].y - 1.5, 3, 3);
      }
    }
  }

  renderBitmapString(x, y, z, font, string) {
    this.ctx.fillStyle = this.getEffectiveColor();
    this.ctx.font = 'bold 20px "JetBrains Mono", monospace';
    this.ctx.fillText(string, this.toX(x), this.toY(y));
  }

  glFlush() {}
}



// =========================================================================
// RUNTIME ANIMATION LOOP & SIMULATION CONTROLLER
// =========================================================================

let activeSimulationMode = 'day'; // 'day', 'night', 'proposal'
let glEngine = null;
let animReqId = null;

function setSimulationMode(mode) {
  activeSimulationMode = mode;
  updateSimulationUI();
}

function updateSimulationUI() {
  const btnDay = document.getElementById('btn-day');
  const btnNight = document.getElementById('btn-night');
  const btnProp = document.getElementById('btn-prop');
  const badge = document.getElementById('hud-mode-badge');

  if (btnDay) btnDay.className = 'px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center gap-1.5';
  if (btnNight) btnNight.className = 'px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center gap-1.5';
  if (btnProp) btnProp.className = 'px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center gap-1.5';

  if (activeSimulationMode === 'day') {
    if (btnDay) btnDay.className = 'px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-md shadow-amber-500/30 transition flex items-center gap-1.5';
    if (badge) {
      badge.className = 'px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/85 backdrop-blur-md text-white shadow-lg flex items-center gap-1.5';
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-white animate-pulse"></span><span>Day View Active [D]</span>';
    }
  } else if (activeSimulationMode === 'night') {
    if (btnNight) btnNight.className = 'px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition flex items-center gap-1.5';
    if (badge) {
      badge.className = 'px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-600/85 backdrop-blur-md text-white shadow-lg flex items-center gap-1.5';
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-indigo-300 animate-pulse"></span><span>Night View Active [N]</span>';
    }
  } else {
    if (btnProp) btnProp.className = 'px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition flex items-center gap-1.5';
    if (badge) {
      badge.className = 'px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-600/85 backdrop-blur-md text-white shadow-lg flex items-center gap-1.5';
      badge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span><span>Proposal View Active [P]</span>';
    }
  }
}

function updatePhysics() {
  // Cloud 1
  if (position < -1.0) position = 2.0;
  position -= speed;

  // Cloud 2
  if (position2 < -2.0) position2 = 2.0;
  position2 -= speed2;

  // Sun
  if (position3 > 2.0) position3 = -2.0;
  position3 += speed3;

  // Bullet (firing towards enemy)
  if (position4 > 0.50) position4 = -0.05;
  position4 += speed4;

  // Boat 1
  if (position9 >= 2.0) position9 = -2.0;
  position9 += speed9;

  // Boat 2
  if (position10 <= -2.0) position10 = 2.0;
  position10 -= speed10;

  // Man going (Freedom Fighter marching with rifle)
  if (position12 >= 2.0) position12 = -2.0;
  position12 += speed12;

  // Tank / Car (Military Tank rolling along roadway)
  if (position11 > 2.0) position11 = -2.0;
  position11 += speed11;
}

function simulationLoop() {
  updatePhysics();

  if (activeSimulationMode === 'day') {
    displayDay_view(glEngine);
  } else if (activeSimulationMode === 'night') {
    displayNight_view(glEngine);
  } else {
    displayProposal(glEngine);
  }

  animReqId = requestAnimationFrame(simulationLoop);
}

function initSimulation() {
  const canvas = document.getElementById('gl-canvas');
  if (!canvas) return;

  glEngine = new GL2Canvas(canvas);

  // Initialize clear color
  glEngine.glClearColor(0.0, 1.0, 1.0, 1.0);

  // Keyboard controls matching GLUT handleKeypress
  window.addEventListener('keydown', (e) => {
    if (e.key === 'd' || e.key === 'D') setSimulationMode('day');
    if (e.key === 'n' || e.key === 'N') setSimulationMode('night');
    if (e.key === 'p' || e.key === 'P') setSimulationMode('proposal');
  });

  updateSimulationUI();
  simulationLoop();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSimulation);
} else {
  initSimulation();
}
