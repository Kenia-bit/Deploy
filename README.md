Medicine & Diseases Information Center

This web app allows users to search for medicines by name and diseases by name and view information such as brand name, generic name, purpose, and warnings. It fetches data from the OpenFDA API and displays information in a table.

. Features
- Search medicines by name using the OpenFDA Drug Label API
- Search diseases by name using the OpenFDA API
- Display information in a clean and interactive table
- It has a hover effect for table rows
- Responsive design for all screen sizes

. Local setup
## Local Setup
1. Clone or download the files
2. Make sure "index.html", "style.css", and "script.js" are in the same folder.
3. Click or open "index.html" in a web browser.
4. Enter a medicine or disease name in the search box and click search by what you're looking for between medicine and disease, and click the search button.

. Deployment
1. Uploading application files to web 01 and web 02:

``` bash
# Uploading to web01
scp /path/to/project/* username@WEB01_IP:/var/www/html/
# Uploading to web02
scp /path/to/project/* username@WEB01_IP:/var/www/html/
```
Each server was running nginx, so it immediately became available over HTTP after placing the files in /var/www/html/.

2. Configure Lb01 to distribute traffic:
I configured Nginx to use an upstream block that contains both web servers, which enables Nginx to distribute traffic between web-01 and web-02.

nginx

http {
    upstream my_app {
        server WEB01_IP
        server WEB02_IP
    }

    server {
        listen 80;

        location / {
        proxy_pass http://my_app;
        }
    }
}

3. Restart Nginx on Lb01:

sudo systemctl restart nginx

4. Access the site via http://LB01_IP (http://3.82.191.98/)

---

### ** API used**
'''markdown
## API used
- OpenFDA Drug Label API: [https://open.fda.gov/apis/drug/label/](https://open.fda.gov/apis/drug/label/)

. Challenges and Notes
- Handling API errors and empty results
- Web-02 deployment required manual troubleshooting to ensure that the application is there and working.
- Configuring the load balancer correctly to test traffic distribution.
- Aligning table layout and hover effect.
