from .app import db

class ():
    __tablename__ = ''

    sample = db.Column(db.Integer, primary_key= True)
    ethnicity = db.Column(db.String(64))
    gender = db.Column(db.String(64))
    age = db.Column(db.Integer)
    location = db.Column(db.String(64))
    bbtype = db.Column(db.String(64))
    wfreq = db.Column(db.Integer)

    def __repr__(self):
        return '<Sample_Methadata %r>' (self.name)