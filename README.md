## Standard Route Tool (but in JavaScript)

This is a remake of VATNZ's [Standard Route Clearance Tool](https://github.com/vatnz-dev/vatSys-SRC-Reader), but in NodeJS.

The source file `(Routes.xml)` comes from the above repo, where I've converted it into JSON for use with this.

Basically, I'm crap at JavaScript, and I needed an excuse to sit down, fiddle with it, and learn. None of this stuff is going to be best practice or the most efficient, but it's a good learning experience.

If you're having a peek at this code, and noticed that I can improve on my code, please let me know! 

### To-Do:
  - Finish off the ICAO From/To resolver
  - Decide what I'm going to do with the routing input function.
  - Implement a proper render handler that can both handle the single return from the RouteDesig lookup *and* the multiple array returns from the ICAO From/To resolver.
  - Probably some other stuff I've forgotten.
  - Set up a GitHub workflow to auto-FTP to dirtyformal.dev on commit.