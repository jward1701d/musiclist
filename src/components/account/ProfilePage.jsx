import React from 'react';

export default function ProfilePage(props) {
  const { match } = props;
  return (
    <section>
      <div className="page-cotent">
        <div className="row">
          <div className="col-sm-12 col-lg-8">
                This is the Profile page. The Profile id is: {match.params.id}
          </div>
          <aside className="col-sm-12 col-lg-4">
                This is the side bar
          </aside>
        </div>
      </div>  
    </section>
  );
}
